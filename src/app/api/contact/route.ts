import { NextRequest, NextResponse } from "next/server";
import { LeadFormSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    // 1. Obtención de IP para Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // 2. Control de Tasa (Máximo 4 peticiones por minuto por IP)
    const rateCheck = checkRateLimit(`contact_${clientIp}`, 4, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: "Demasiadas solicitudes. Por motivos de seguridad, espera un minuto antes de reintentar.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.ceil((rateCheck.reset - Date.now()) / 1000).toString(),
          },
        }
      );
    }

    // 3. Parseo y Validación de Payload con Zod
    const body = await req.json();
    const parsed = LeadFormSchema.safeParse(body);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Datos no válidos.";
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    // 4. Verificación Honeypot (Si el bot rellenó el campo oculto website_url_hp, descartar)
    if (parsed.data.website_url_hp && parsed.data.website_url_hp.length > 0) {
      // Simular éxito para no alertar al bot
      return NextResponse.json({ success: true, message: "Solicitud procesada con éxito." });
    }

    const { fullName, email, phone, businessName, businessType, branchesCount, planInterested, message } = parsed.data;

    // En producción, aquí se enviaría el email vía Resend/Sendgrid o webhook a CRM
    console.log(`[SECURE LEAD] Nueva solicitud legítima recibida:`, {
      fullName,
      email,
      phone,
      businessName,
      businessType,
      branchesCount,
      planInterested,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "¡Gracias! Tu solicitud ha sido registrada de forma segura. Un asesor se comunicará contigo en menos de 15 minutos.",
    });
  } catch (error) {
    console.error("[ERROR CONTACT API]", error);
    return NextResponse.json(
      { error: "Ocurrió un error inesperado al procesar la solicitud." },
      { status: 500 }
    );
  }
}
