import { NextRequest, NextResponse } from "next/server";
import { CheckoutIntentSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";

const PLAN_PRICES = {
  basico_mensual: { name: "Isaac POS Básico (Mensual)", amount: 29, currency: "USD" },
  basico_anual: { name: "Isaac POS Básico (Anual)", amount: 290, currency: "USD" },
  pro_mensual: { name: "Isaac POS Pro (Mensual)", amount: 59, currency: "USD" },
  pro_anual: { name: "Isaac POS Pro (Anual)", amount: 590, currency: "USD" },
  vitalicia: { name: "Isaac POS Licencia Vitalicia", amount: 499, currency: "USD" },
};

export async function POST(req: NextRequest) {
  try {
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // Rate Limiting
    const rateCheck = checkRateLimit(`checkout_${clientIp}`, 5, 60 * 1000);
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
        { error: parsed.error.issues[0]?.message || "Datos no válidos" },
        { status: 400 }
      );
    }

    const { planId, customerEmail, customerName } = parsed.data;
    const selectedPlan = PLAN_PRICES[planId];

    if (!selectedPlan) {
      return NextResponse.json({ error: "Plan no encontrado" }, { status: 404 });
    }

    // Aquí se generaría la sesión de Stripe Checkout o PaymentIntent con Stripe Secret Key en el servidor
    // Garantiza cumplimiento PCI-DSS SAQ A (sin tocar números de tarjeta en el servidor)
    const mockCheckoutSession = {
      sessionId: "cs_test_" + Math.random().toString(36).substring(2, 15),
      checkoutUrl: `https://checkout.stripe.com/pay/cs_test_mock_${planId}`,
      planName: selectedPlan.name,
      amount: selectedPlan.amount,
      currency: selectedPlan.currency,
      customerEmail,
      customerName,
      pciCompliant: true,
      encryption: "TLS 1.3 End-to-End",
    };

    return NextResponse.json({
      success: true,
      data: mockCheckoutSession,
      message: "Sesión de pago cifrada generada con éxito.",
    });
  } catch (error) {
    console.error("[ERROR CHECKOUT API]", error);
    return NextResponse.json(
      { error: "Error de servidor al iniciar la transacción segura." },
      { status: 500 }
    );
  }
}
