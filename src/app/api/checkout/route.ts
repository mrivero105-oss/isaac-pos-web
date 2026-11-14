import { NextRequest, NextResponse } from "next/server";
import { CheckoutIntentSchema } from "@/lib/validations";
import { checkRateLimitDistributed, getClientIp } from "@/lib/rateLimit";
import { getBcvRates } from "@/lib/bcv";
import {
  dispatchCommercialNotification,
  escapeHtml,
} from "@/lib/notifications";

const PLAN_PRICES = {
  basico_mensual: { name: "Plan Emprendedor (Mensual)", amount: 12, currency: "USD" },
  basico_anual: { name: "Plan Emprendedor (Anual - 2 Meses Gratis)", amount: 99, currency: "USD" },
  pro_mensual: { name: "Plan Profesional (Mensual)", amount: 24, currency: "USD" },
  pro_anual: { name: "Plan Profesional (Anual - Recomendado)", amount: 190, currency: "USD" },
  vitalicia: { name: "Licencia Vitalicia (1 Admin + 1 Caja)", amount: 199, currency: "USD" },
} as const;

const PAYMENT_INSTRUCTIONS = {
  pago_movil: {
    title: "Pago Móvil Interbancario (Venezuela)",
    bank: "Banco Mercantil (0105) / Banesco (0134)",
    phone: "0424-8302226",
    idNumber: "V-19876543",
    beneficiary: "Isaac POS Sistemas, C.A.",
    description:
      "Calculado a la tasa oficial BCV del día. Envía el comprobante por WhatsApp junto con tu número de orden.",
  },
  zelle: {
    title: "Zelle (Estados Unidos / USD)",
    email: "isaacpospage@gmail.com",
    beneficiary: "Isaac Software Solutions",
    description:
      "Envía el monto exacto en USD indicando tu número de orden o nombre en el memo.",
  },
  binance: {
    title: "Binance Pay / USDT (Cripto)",
    payId: "84729104",
    crypto: "USDT (Red TRC20 / BEP20)",
    beneficiary: "IsaacPOS_Official",
    description:
      "Cero comisiones con Binance Pay ID. Transferencia instantánea 24/7.",
  },
  acuerdo_directo: {
    title: "Acuerdo Directo / Pago Mixto con Asesor",
    phone: "0424-8302226",
    email: "isaacpospage@gmail.com",
    beneficiary: "Isaac POS Sistemas, C.A.",
    description:
      "Coordina pago mixto, efectivo, transferencia nacional o facturación empresarial directamente con un asesor oficial.",
  },
  card: {
    title: "Tarjeta Internacional (Stripe Checkout)",
    description:
      "Redirección segura PCI-DSS SAQ A alojada en Stripe sin almacenamiento de tarjetas en nuestro servidor.",
  },
} as const;

async function createStripeCheckoutUrl(params: {
  orderId: string;
  planName: string;
  amountUsd: number;
  customerEmail?: string;
}): Promise<string | null> {
  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim();
  if (!stripeKey) return null;

  const baseAppUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://www.isaacventas.com").replace(/\/+$/, "");
  const form = new URLSearchParams({
    mode: "payment",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][product_data][name]": `Isaac POS - ${params.planName}`,
    "line_items[0][price_data][unit_amount]": String(Math.round(params.amountUsd * 100)),
    "line_items[0][quantity]": "1",
    success_url: `${baseAppUrl}/?checkout=success&order=${encodeURIComponent(params.orderId)}`,
    cancel_url: `${baseAppUrl}/?checkout=cancelled&order=${encodeURIComponent(params.orderId)}`,
    "metadata[orderId]": params.orderId,
    ...(params.customerEmail ? { customer_email: params.customerEmail } : {}),
  });

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: form,
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("[STRIPE SESSION ERROR]", res.status, errText);
    return null;
  }

  const data = (await res.json()) as { url?: string };
  return data.url || null;
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // Rate Limiting (Máximo 10 intentos de checkout por minuto por IP)
    const rateCheck = await checkRateLimitDistributed(`checkout_${clientIp}`, 10, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { success: false, error: "Demasiados intentos de checkout. Por favor espera un momento." },
        {
          status: 429,
          headers: {
            "Retry-After": Math.max(1, Math.ceil((rateCheck.reset - Date.now()) / 1000)).toString(),
          },
        }
      );
    }

    const body = await req.json();
    const parsed = CheckoutIntentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.issues[0]?.message || "Datos de orden no válidos." },
        { status: 400 }
      );
    }

    const {
      planId,
      customerEmail,
      customerName,
      customerPhone,
      companyTaxId,
      paymentMethod,
      paymentReference,
      extraBoxes = 0,
    } = parsed.data;

    const basePlan = PLAN_PRICES[planId as keyof typeof PLAN_PRICES];
    if (!basePlan) {
      return NextResponse.json(
        { success: false, error: "El plan seleccionado no existe." },
        { status: 404 }
      );
    }

    if (paymentMethod === "card" && !process.env.STRIPE_SECRET_KEY?.trim()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "El pago con tarjeta en línea no está habilitado actualmente. Selecciona Pago Móvil, Zelle, Binance Pay o Acuerdo Directo.",
        },
        { status: 503 }
      );
    }

    const isLifetime = planId === "vitalicia";
    const finalAmountUsd = isLifetime ? basePlan.amount + extraBoxes * 49 : basePlan.amount;
    const finalPlanName =
      isLifetime && extraBoxes > 0
        ? `Licencia Vitalicia (1 Admin + ${1 + extraBoxes} Cajas Activas)`
        : basePlan.name;

    const selectedPlan = {
      name: finalPlanName,
      amount: finalAmountUsd,
      currency: basePlan.currency,
    };

    const finalCustomerName = customerName.trim();
    const finalCustomerEmail =
      customerEmail && customerEmail.trim().length > 0
        ? customerEmail.trim()
        : "";

    const rates = await getBcvRates(3500);
    const bcvRate = rates.usd;
    const amountBs = Number((selectedPlan.amount * bcvRate).toFixed(2));
    const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.random()
      .toString(36)
      .substring(2, 5)
      .toUpperCase()}`;

    let checkoutUrl: string | null = null;
    if (paymentMethod === "card") {
      checkoutUrl = await createStripeCheckoutUrl({
        orderId,
        planName: selectedPlan.name,
        amountUsd: selectedPlan.amount,
        customerEmail: finalCustomerEmail || undefined,
      });
      if (!checkoutUrl) {
        return NextResponse.json(
          {
            success: false,
            error: "No se pudo iniciar la sesión segura de Stripe. Selecciona otro método de pago o contáctanos por WhatsApp.",
          },
          { status: 502 }
        );
      }
    }

    const whatsappText =
      `¡Hola! Acabo de registrar mi orden en Isaac POS:\n\n` +
      `📌 *N° de Orden:* ${orderId}\n` +
      `🏷️ *Plan:* ${selectedPlan.name}\n` +
      `👤 *Cliente:* ${finalCustomerName}\n` +
      (finalCustomerEmail ? `📧 *Email:* ${finalCustomerEmail}\n` : "") +
      `📱 *Teléfono:* ${customerPhone}\n` +
      `💵 *Monto:* $${selectedPlan.amount} USD (Bs. ${amountBs.toLocaleString("es-VE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })})\n` +
      `💳 *Método de Pago:* ${paymentMethod.toUpperCase().replace("_", " ")}\n` +
      (paymentReference ? `🔢 *N° Referencia:* ${paymentReference}\n\n` : `\n`) +
      `Deseo proceder con la activación oficial de mi licencia.`;

    const whatsappUrl = `https://wa.me/584248302226?text=${encodeURIComponent(whatsappText)}`;

    const notification = await dispatchCommercialNotification({
      subject: `Nueva Orden ${orderId}: ${finalCustomerName} - ${selectedPlan.name}`,
      replyTo: finalCustomerEmail || undefined,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #0b1329; color: #f8fafc; border-radius: 12px;">
          <h2 style="margin-top: 0; color: #34d399;">Nueva Orden Generada: ${escapeHtml(orderId)}</h2>
          <p><strong>Plan:</strong> ${escapeHtml(selectedPlan.name)}</p>
          <p><strong>Monto:</strong> $${selectedPlan.amount} USD (Bs. ${amountBs.toFixed(2)} @ ${bcvRate})</p>
          <p><strong>Cliente:</strong> ${escapeHtml(finalCustomerName)}</p>
          <p><strong>Teléfono:</strong> ${escapeHtml(customerPhone)}</p>
          ${finalCustomerEmail ? `<p><strong>Email:</strong> ${escapeHtml(finalCustomerEmail)}</p>` : ""}
          <p><strong>Método:</strong> ${escapeHtml(paymentMethod)}</p>
        </div>
      `,
      text: whatsappText,
      webhookPayload: {
        event: "checkout_order",
        orderId,
        plan: selectedPlan,
        amountUsd: selectedPlan.amount,
        amountBs,
        bcvRate,
        customer: {
          name: finalCustomerName,
          email: finalCustomerEmail,
          phone: customerPhone,
          taxId: companyTaxId,
        },
        paymentMethod,
      },
    });

    const checkoutResponse = {
      orderId,
      plan: selectedPlan,
      extraBoxes,
      amountUsd: selectedPlan.amount,
      amountBs,
      bcvRate,
      customer: {
        name: finalCustomerName,
        email: finalCustomerEmail || "No proporcionado",
        phone: customerPhone,
        taxId: companyTaxId,
      },
      paymentMethod,
      paymentReference: paymentReference || null,
      checkoutUrl,
      notified: notification.sent,
      instructions:
        PAYMENT_INSTRUCTIONS[paymentMethod as keyof typeof PAYMENT_INSTRUCTIONS] ||
        PAYMENT_INSTRUCTIONS.acuerdo_directo,
      whatsappConfirmationUrl: whatsappUrl,
      pciCompliant: true,
      encryption: "TLS 1.3 / SHA-256",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: checkoutResponse,
      message: "Orden de activación generada satisfactoriamente.",
    });
  } catch (error) {
    console.error("[ERROR CHECKOUT API]", error);
    return NextResponse.json(
      { success: false, error: "Error de servidor al iniciar la transacción segura." },
      { status: 500 }
    );
  }
}
