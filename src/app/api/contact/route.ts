import { NextRequest, NextResponse } from "next/server";
import { LeadFormSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rateLimit";

const RECIPIENT_EMAILS = process.env.NOTIFICATION_EMAILS
  ? process.env.NOTIFICATION_EMAILS.split(",").map((e) => e.trim()).filter(Boolean)
  : [
      "mrivero105@gmail.com",
      "isaacpospage@gmail.com",
    ];

export async function POST(req: NextRequest) {
  try {
    // 1. Obtención de IP para Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // 2. Control de Tasa (Máximo 6 peticiones por minuto por IP)
    const rateCheck = checkRateLimit(`contact_${clientIp}`, 6, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          error: "Demasiadas solicitudes. Por motivos de seguridad, espera un momento antes de reintentar.",
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

    // 4. Verificación Honeypot anti-bots
    if (parsed.data.website_url_hp && parsed.data.website_url_hp.length > 0) {
      return NextResponse.json({ success: true, message: "Solicitud procesada con éxito." });
    }

    const { fullName, email, phone, businessName, businessType, branchesCount, planInterested, message } = parsed.data;

    const timestamp = new Date().toLocaleString("es-VE", { timeZone: "America/Caracas" });
    const cleanPhone = phone.replace(/[^0-9]/g, "");

    // 5. Envío de Correo Electrónico a los 2 buzones si RESEND_API_KEY está configurada
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;

    if (resendApiKey) {
      try {
        const emailHtml = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b1329; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; color: #f8fafc;">
            <div style="background: linear-gradient(135deg, #0ea5e9, #10b981); padding: 24px; text-align: center;">
              <h1 style="margin: 0; color: #020617; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">ISAAC POS ULTRA</h1>
              <p style="margin: 4px 0 0 0; color: #020617; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Nueva Solicitud de Demostración</p>
            </div>
            
            <div style="padding: 28px 24px;">
              <p style="font-size: 16px; line-height: 1.5; color: #cbd5e1; margin-top: 0;">
                ¡Hola! Tienes un nuevo cliente interesado registrado desde la página web de <strong>Isaac POS</strong>:
              </p>

              <div style="background-color: #020617; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8; width: 140px;"><strong>Cliente:</strong></td>
                    <td style="padding: 8px 0; color: #ffffff; font-weight: 700;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Correo:</strong></td>
                    <td style="padding: 8px 0; color: #38bdf8;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Teléfono / WhatsApp:</strong></td>
                    <td style="padding: 8px 0; color: #34d399; font-weight: 700;">
                      <a href="https://wa.me/${cleanPhone}" style="color: #34d399; text-decoration: none;">${phone} (Clic para chatear)</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Comercio:</strong></td>
                    <td style="padding: 8px 0; color: #ffffff; font-weight: 700;">${businessName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Rubro:</strong></td>
                    <td style="padding: 8px 0; color: #cbd5e1; text-transform: capitalize;">${businessType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Cajas / Terminales:</strong></td>
                    <td style="padding: 8px 0; color: #cbd5e1;">${branchesCount}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Plan de Interés:</strong></td>
                    <td style="padding: 8px 0; color: #fbbf24; font-weight: 700;">${planInterested}</td>
                  </tr>
                  ${message ? `
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;"><strong>Mensaje:</strong></td>
                    <td style="padding: 8px 0; color: #cbd5e1;">${message}</td>
                  </tr>` : ""}
                  <tr>
                    <td style="padding: 8px 0; color: #94a3b8;"><strong>Fecha y Hora:</strong></td>
                    <td style="padding: 8px 0; color: #64748b; font-size: 12px;">${timestamp} (Hora Venezuela)</td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`¡Hola ${fullName}! Te escribo de Isaac POS en respuesta a tu solicitud para ${businessName}.`)}" 
                   style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: #020617; padding: 14px 28px; border-radius: 12px; font-weight: 900; font-size: 15px; text-decoration: none;">
                  Abrir Chat de WhatsApp con el Cliente
                </a>
              </div>
            </div>

            <div style="background-color: #020617; border-top: 1px solid #1e293b; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
              Notificación oficial automática del sistema central • Isaac POS Ultra
            </div>
          </div>
        `;

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Isaac POS Leads <onboarding@resend.dev>",
            to: RECIPIENT_EMAILS,
            reply_to: email,
            subject: `🔔 Nueva Solicitud de Demo: ${fullName} - ${businessName} (Isaac POS)`,
            html: emailHtml,
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
          console.log(`[EMAIL OK] Notificación enviada exitosamente a: ${RECIPIENT_EMAILS.join(", ")}`);
        } else {
          const errData = await resendRes.text();
          console.error(`[EMAIL ERROR RESEND]`, errData);
        }
      } catch (err) {
        console.error(`[EMAIL DISPATCH ERROR]`, err);
      }
    }

    // Registro siempre en servidor
    console.log(`[SECURE LEAD] Nueva solicitud registrada:`, {
      fullName,
      email,
      phone,
      businessName,
      businessType,
      branchesCount,
      planInterested,
      timestamp,
      recipients: RECIPIENT_EMAILS,
      emailSent,
    });

    return NextResponse.json({
      success: true,
      emailSent,
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
