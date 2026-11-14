import { NextRequest, NextResponse } from "next/server";
import { LeadFormSchema } from "@/lib/validations";
import { checkRateLimitDistributed, getClientIp } from "@/lib/rateLimit";
import {
  dispatchCommercialNotification,
  escapeHtml,
} from "@/lib/notifications";

async function verifyTurnstileToken(token: string, clientIp: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return true;
  if (!token) return false;

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
      ...(clientIp !== "unknown-client" ? { remoteip: clientIp } : {}),
    });
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) return false;
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (err) {
    console.error("[TURNSTILE VERIFY ERROR]", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // Control de Tasa (Máximo 6 peticiones por minuto por IP)
    const rateCheck = await checkRateLimitDistributed(`contact_${clientIp}`, 6, 60 * 1000);
    if (!rateCheck.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Demasiadas solicitudes. Por motivos de seguridad, espera un momento antes de reintentar.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": Math.max(1, Math.ceil((rateCheck.reset - Date.now()) / 1000)).toString(),
          },
        }
      );
    }

    const body = await req.json();
    const parsed = LeadFormSchema.safeParse(body);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || "Datos no válidos.";
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    // Verificación Honeypot anti-bots
    if (parsed.data.website_url_hp && parsed.data.website_url_hp.length > 0) {
      return NextResponse.json({ success: true, emailSent: false, message: "Solicitud procesada con éxito." });
    }

    // Verificación Cloudflare Turnstile si TURNSTILE_SECRET_KEY está configurada
    if (process.env.TURNSTILE_SECRET_KEY?.trim()) {
      const turnstileOk = await verifyTurnstileToken(parsed.data.turnstileToken || "", clientIp);
      if (!turnstileOk) {
        return NextResponse.json(
          { success: false, error: "Verificación anti-bot fallida. Recarga e intenta nuevamente." },
          { status: 400 }
        );
      }
    }

    const {
      fullName,
      email,
      phone,
      businessName,
      businessType,
      branchesCount,
      planInterested,
      message,
    } = parsed.data;

    const timestamp = new Date().toLocaleString("es-VE", { timeZone: "America/Caracas" });
    const cleanPhone = phone.replace(/[^0-9]/g, "");

    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeBusinessName = escapeHtml(businessName);
    const safeBusinessType = escapeHtml(businessType);
    const safeBranchesCount = escapeHtml(branchesCount);
    const safePlanInterested = escapeHtml(planInterested);
    const safeMessage = message ? escapeHtml(message) : "";

    const emailSubject = `Solicitud de Demostración: ${fullName} - ${businessName} (Isaac POS)`;

    const emailHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b1329; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; color: #f8fafc;">
        <div style="background: linear-gradient(135deg, #0ea5e9, #10b981); padding: 24px; text-align: center;">
          <h1 style="margin: 0; color: #020617; font-size: 24px; font-weight: 900; letter-spacing: -0.5px;">ISAAC POS ULTRA</h1>
          <p style="margin: 4px 0 0 0; color: #020617; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Nueva Solicitud de Demostración</p>
        </div>
        <div style="padding: 28px 24px;">
          <p style="font-size: 16px; line-height: 1.5; color: #cbd5e1; margin-top: 0;">
            Nuevo cliente interesado registrado desde la página web oficial de <strong>Isaac POS Ultra</strong>:
          </p>
          <div style="background-color: #020617; border: 1px solid #334155; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; width: 140px;"><strong>Cliente:</strong></td>
                <td style="padding: 8px 0; color: #ffffff; font-weight: 700;">${safeFullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8;"><strong>Correo:</strong></td>
                <td style="padding: 8px 0; color: #38bdf8;"><a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none;">${safeEmail}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8;"><strong>Teléfono / WhatsApp:</strong></td>
                <td style="padding: 8px 0; color: #34d399; font-weight: 700;">
                  <a href="https://wa.me/${cleanPhone}" style="color: #34d399; text-decoration: none;">${safePhone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8;"><strong>Comercio:</strong></td>
                <td style="padding: 8px 0; color: #ffffff; font-weight: 700;">${safeBusinessName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8;"><strong>Rubro:</strong></td>
                <td style="padding: 8px 0; color: #cbd5e1; text-transform: capitalize;">${safeBusinessType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8;"><strong>Cajas / Terminales:</strong></td>
                <td style="padding: 8px 0; color: #cbd5e1;">${safeBranchesCount}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #94a3b8;"><strong>Plan de Interés:</strong></td>
                <td style="padding: 8px 0; color: #fbbf24; font-weight: 700;">${safePlanInterested}</td>
              </tr>
              ${safeMessage ? `
              <tr>
                <td style="padding: 8px 0; color: #94a3b8; vertical-align: top;"><strong>Mensaje:</strong></td>
                <td style="padding: 8px 0; color: #cbd5e1;">${safeMessage}</td>
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
      </div>
    `;

    const emailText =
      `NUEVA SOLICITUD DE DEMO - ISAAC POS ULTRA\n\n` +
      `Cliente: ${fullName}\n` +
      `Correo: ${email}\n` +
      `Teléfono: ${phone}\n` +
      `Comercio: ${businessName}\n` +
      `Rubro: ${businessType}\n` +
      `Cajas / Terminales: ${branchesCount}\n` +
      `Plan de Interés: ${planInterested}\n` +
      (message ? `Mensaje: ${message}\n` : "") +
      `Fecha: ${timestamp}\n\n` +
      `WhatsApp: https://wa.me/${cleanPhone}`;

    const dispatch = await dispatchCommercialNotification({
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
      replyTo: email,
      webhookPayload: {
        event: "demo_lead",
        fullName,
        email,
        phone,
        businessName,
        businessType,
        branchesCount,
        planInterested,
        message: message || "",
        timestamp,
      },
    });

    console.log("[LEAD DISPATCH]", {
      businessName,
      planInterested,
      timestamp,
      recipients: dispatch.recipients,
      emailSent: dispatch.emailSent,
      webhookSent: dispatch.webhookSent,
    });

    if (!dispatch.sent) {
      return NextResponse.json(
        {
          success: false,
          emailSent: false,
          fallbackWhatsapp: true,
          error:
            "El envío automático por correo no está disponible en este momento. Usa el botón de WhatsApp abajo para enviar tu solicitud directa al equipo.",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      emailSent: dispatch.emailSent,
      message:
        "¡Gracias! Tu solicitud ha sido enviada al equipo comercial. Un asesor se comunicará contigo en menos de 15 minutos.",
    });
  } catch (error) {
    console.error("[ERROR CONTACT API]", error);
    return NextResponse.json(
      { success: false, error: "Ocurrió un error inesperado al procesar la solicitud." },
      { status: 500 }
    );
  }
}
