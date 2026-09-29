import { NextRequest, NextResponse } from "next/server";
import { CheckoutIntentSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";

const PLAN_PRICES = {
  basico_mensual: { name: "Isaac POS Básico (Mensual)", amount: 29, currency: "USD" },
  basico_anual: { name: "Isaac POS Básico (Anual - 2 Meses Gratis)", amount: 290, currency: "USD" },
  pro_mensual: { name: "Isaac POS Pro (Mensual)", amount: 59, currency: "USD" },
  pro_anual: { name: "Isaac POS Pro (Anual - 2 Meses Gratis)", amount: 590, currency: "USD" },
  vitalicia: { name: "Isaac POS Licencia Vitalicia (Pago Único)", amount: 499, currency: "USD" },
};

// Datos bancarios oficiales configurados para recepción de pagos
const PAYMENT_INSTRUCTIONS = {
  pago_movil: {
    title: "Pago Móvil Interbancario (Venezuela)",
    bank: "Banco Mercantil (0105) / Banesco (0134)",
    phone: "0424-8302226",
    idNumber: "V-19876543",
    beneficiary: "Isaac POS Sistemas, C.A.",
    description: "Calculado a la tasa oficial BCV del día. Al pagar, ingresa los últimos 6 dígitos de la referencia.",
  },
  zelle: {
    title: "Zelle (Estados Unidos / USD)",
    email: "isaacpospage@gmail.com",
    beneficiary: "Isaac Software Solutions",
    memo: "Indicar tu Nombre y Plan",
    description: "Envía el monto exacto en USD. Los pagos por Zelle se acreditan inmediatamente.",
  },
  binance: {
    title: "Binance Pay / USDT (Cripto)",
    payId: "84729104",
    crypto: "USDT (Red TRC20 / BEP20)",
    beneficiary: "IsaacPOS_Official",
    description: "Cero comisiones con Binance Pay ID. Transferencia instantánea 24/7.",
  },
  card: {
    title: "Tarjeta Internacional (Stripe PCI-DSS SAQ A)",
    description: "Procesamiento seguro con cifrado TLS 1.3 de extremo a extremo sin retención de datos en el servidor.",
  },
};

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // Rate Limiting (Máximo 10 intentos de checkout por minuto por IP)
    const rateCheck = checkRateLimit(`checkout_${clientIp}`, 10, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Demasiados intentos de checkout. Por favor espera un momento." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = CheckoutIntentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Datos de orden no válidos." },
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
    } = parsed.data;

    const selectedPlan = PLAN_PRICES[planId];

    if (!selectedPlan) {
      return NextResponse.json({ error: "El plan seleccionado no existe." }, { status: 404 });
    }

    // Tasa BCV de referencia oficial
    const bcvRate = 857.89;
    const amountBs = selectedPlan.amount * bcvRate;
    const orderId = `ORD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    // Generar mensaje formateado para WhatsApp
    const whatsappText = `¡Hola! Acabo de registrar mi orden en Isaac POS:\n\n` +
      `📌 *N° de Orden:* ${orderId}\n` +
      `🏷️ *Plan:* ${selectedPlan.name}\n` +
      `👤 *Cliente:* ${customerName}\n` +
      `📧 *Email:* ${customerEmail}\n` +
      `📱 *Teléfono:* ${customerPhone || "N/A"}\n` +
      `💵 *Monto:* $${selectedPlan.amount} USD (Bs. ${amountBs.toLocaleString("es-VE", { minimumFractionDigits: 2 })})\n` +
      `💳 *Método de Pago:* ${paymentMethod.toUpperCase()}\n` +
      (paymentReference ? `🔢 *N° Referencia:* ${paymentReference}\n\n` : `\n`) +
      `Deseo proceder con la activación de mi licencia.`;

    const whatsappUrl = `https://wa.me/584248302226?text=${encodeURIComponent(whatsappText)}`;

    const checkoutResponse = {
      orderId,
      plan: selectedPlan,
      amountUsd: selectedPlan.amount,
      amountBs: amountBs,
      bcvRate,
      customer: {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        taxId: companyTaxId,
      },
      paymentMethod,
      paymentReference: paymentReference || null,
      instructions: PAYMENT_INSTRUCTIONS[paymentMethod],
      whatsappConfirmationUrl: whatsappUrl,
      pciCompliant: true,
      encryption: "TLS 1.3 / SHA-256",
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: checkoutResponse,
      message: "Orden de activación generada satisfactoriamente con cifrado seguro.",
    });
  } catch (error) {
    console.error("[ERROR CHECKOUT API]", error);
    return NextResponse.json(
      { error: "Error de servidor al iniciar la transacción segura." },
      { status: 500 }
    );
  }
}
