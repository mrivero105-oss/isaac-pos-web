import { NextRequest, NextResponse } from "next/server";
import { CustomerReviewSchema } from "@/lib/validations";
import { checkRateLimitDistributed, getClientIp } from "@/lib/rateLimit";
import {
  dispatchCommercialNotification,
  escapeHtml,
} from "@/lib/notifications";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    const rateLimit = await checkRateLimitDistributed(`review_${ip}`, 3, 15 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Has enviado demasiadas reseñas recientemente. Intenta más tarde.",
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = CustomerReviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Por favor revisa los campos del formulario.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Neutralización silenciosa si un bot llena el campo honeypot
    if (data.website_url_hp && data.website_url_hp.trim().length > 0) {
      return NextResponse.json({
        success: true,
        notified: true,
        message: "Reseña recibida para revisión.",
      });
    }

    const starsText = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
    const subject = `[Nueva Reseña Cliente ${data.rating}★] ${data.business} (${data.city})`;

    const textContent = [
      "NUEVA RESEÑA DE CLIENTE PARA APROBACIÓN - ISAAC POS",
      "---------------------------------------------------",
      `Calificación: ${starsText} (${data.rating}/5)`,
      `Cliente: ${data.name} (${data.role || "Propietario"})`,
      `Comercio: ${data.business}`,
      `Ciudad: ${data.city}`,
      `Rubro: ${data.category}`,
      `Contacto de verificación (no público): ${data.contactInfo}`,
      "",
      "Comentario:",
      `"${data.comment}"`,
    ].join("\n");

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #0f172a; margin-top: 0;">Nueva Reseña de Cliente para Moderación</h2>
        <p style="font-size: 18px; color: #f59e0b; margin: 8px 0;"><strong>${escapeHtml(starsText)} (${data.rating}/5)</strong></p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
          <tr><td style="padding: 6px 0;"><strong>Nombre:</strong></td><td>${escapeHtml(data.name)} (${escapeHtml(data.role || "Propietario")})</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Comercio:</strong></td><td>${escapeHtml(data.business)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Ciudad:</strong></td><td>${escapeHtml(data.city)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Rubro:</strong></td><td>${escapeHtml(data.category)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Contacto Verificación:</strong></td><td>${escapeHtml(data.contactInfo)}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 6px; font-style: italic; color: #0f172a;">
          "${escapeHtml(data.comment)}"
        </div>
      </div>
    `;

    const notifyResult = await dispatchCommercialNotification({
      subject,
      text: textContent,
      html: htmlContent,
      webhookPayload: {
        type: "customer_review_submission",
        ...data,
        submittedAt: new Date().toISOString(),
      },
    });

    const whatsappMessage = [
      `Hola equipo de Isaac POS, envío mi reseña como cliente para su aprobación en la web:`,
      `• Calificación: ${data.rating}/5 estrellas`,
      `• Nombre: ${data.name} (${data.role || "Propietario"})`,
      `• Comercio: ${data.business} (${data.city} - ${data.category})`,
      `• Contacto de licencia: ${data.contactInfo}`,
      `• Experiencia: "${data.comment}"`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/584248302226?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json({
      success: true,
      notified: notifyResult.sent,
      fallbackWhatsapp: !notifyResult.sent,
      whatsappUrl,
      message: notifyResult.sent
        ? "Tu reseña fue recibida y pasará por verificación antes de publicarse."
        : "Para completar la verificación de tu reseña de inmediato, envíala con un clic por WhatsApp.",
    });
  } catch (error) {
    console.error("[REVIEWS API ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "No se pudo procesar tu reseña en este momento.",
      },
      { status: 500 }
    );
  }
}
