import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
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

    // 5. Envío de Correo Electrónico (Gmail SMTP vía GMAIL_PASS o Resend API vía RESEND_API_KEY)
    const gmailPass = process.env.GMAIL_PASS; // Contraseña de aplicación de 16 letras de Google
    const gmailUser = process.env.GMAIL_USER || "isaacpospage@gmail.com";
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailSent = false;

    const emailSubject = `🔔 Solicitud de Demostración: ${fullName} - ${businessName} (Isaac POS)`;

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b1329; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; color: #f8fafc;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #10b981); padding: 24px; text-align: center;">
          <h1 style="margin: 0; color: #020617; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">ISAAC POS ULTRA</h1>
          <p style="margin: 4px 0 0 0; color: #020617; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Nueva Solicitud de Demostración</p>
        </div>
        
        <div style="padding: 28px 24px;">
          <p style="font-size: 16px; line-height: 1.5; color: #cbd5e1; margin-top: 0;">
            ¡Hola! Tienes un nuevo cliente interesado registrado desde la página web oficial de <strong>Isaac POS Ultra</strong>:
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
            <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`¡Hola ${fullName}! Te escribo del equipo de Isaac POS en respuesta a tu solicitud para ${businessName}.`)}" 
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

    // 1. Envío por Gmail SMTP si GMAIL_PASS está configurado
    if (gmailPass) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: gmailUser,
            pass: gmailPass.replace(/\s+/g, ""),
          },
        });

        await transporter.sendMail({
          from: `"Isaac POS Ultra" <${gmailUser}>`,
          to: RECIPIENT_EMAILS,
          replyTo: email,
          subject: emailSubject,
          html: emailHtml,
        });

        emailSent = true;
        console.log(`[EMAIL OK - GMAIL SMTP] Notificación enviada a: ${RECIPIENT_EMAILS.join(", ")}`);
      } catch (err) {
        console.error(`[EMAIL ERROR - GMAIL SMTP]`, err);
      }
    }
    // 2. Fallback con Resend API si RESEND_API_KEY está configurada
    else if (resendApiKey) {
      try {
        // Enviar a cada destinatario por separado para que la restricción de pruebas de Resend
        // no bloquee a la cuenta propietaria (mrivero105@gmail.com)
        for (const recipient of RECIPIENT_EMAILS) {
          try {
            const resendRes = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${resendApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: "Isaac POS Leads <onboarding@resend.dev>",
                to: [recipient],
                reply_to: email,
                subject: emailSubject,
                html: emailHtml,
              }),
            });

            if (resendRes.ok) {
              emailSent = true;
              console.log(`[EMAIL OK - RESEND] Notificación enviada exitosamente a: ${recipient}`);
            } else {
              const errData = await resendRes.text();
              console.warn(`[EMAIL NOTICE - RESEND] Respuesta para ${recipient}:`, errData);
            }
          } catch (itemErr) {
            console.error(`[EMAIL ERROR RESEND INDIVIDUAL]`, itemErr);
          }
        }
      } catch (err) {
        console.error(`[EMAIL DISPATCH ERROR - RESEND]`, err);
      }
    } else {
      console.warn(`[EMAIL WARNING] No se ha configurado GMAIL_PASS ni RESEND_API_KEY en las variables de entorno.`);
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
