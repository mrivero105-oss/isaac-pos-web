import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CustomerReviewSchema } from "@/lib/validations";
import { checkRateLimitDistributed, getClientIp } from "@/lib/rateLimit";
import {
  dispatchCommercialNotification,
  escapeHtml,
} from "@/lib/notifications";
import {
  createStoredReview,
  deleteStoredReview,
  getActiveStorageBackend,
  getAllStoredReviews,
  getApprovedPublicReviews,
  updateStoredReviewStatus,
  verifyAdminPassword,
} from "@/lib/reviewsStore";

const ModerationPatchSchema = z.object({
  id: z.string().trim().min(3).max(80),
  status: z.enum(["pending", "approved", "rejected"]),
});

const ModerationDeleteSchema = z.object({
  id: z.string().trim().min(3).max(80),
});

export async function GET(req: NextRequest) {
  try {
    const isAdminQuery = req.nextUrl.searchParams.get("admin") === "1";

    if (isAdminQuery) {
      const ip = getClientIp(req);
      const rl = await checkRateLimitDistributed(`admin_reviews_auth_${ip}`, 15, 10 * 60 * 1000);
      if (!rl.success) {
        return NextResponse.json(
          { success: false, error: "Demasiados intentos de acceso. Espera unos minutos." },
          { status: 429 }
        );
      }

      const adminPassword = req.headers.get("x-admin-password");
      if (!verifyAdminPassword(adminPassword)) {
        return NextResponse.json(
          { success: false, error: "Clave de moderación incorrecta." },
          { status: 401 }
        );
      }

      const allReviews = await getAllStoredReviews();
      return NextResponse.json(
        {
          success: true,
          reviews: allReviews,
          storageBackend: getActiveStorageBackend(),
        },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const approvedReviews = await getApprovedPublicReviews();
    return NextResponse.json(
      {
        success: true,
        reviews: approvedReviews,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[REVIEWS GET ERROR]", error);
    return NextResponse.json(
      { success: false, error: "No se pudieron cargar las reseñas." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    const adminPassword = req.headers.get("x-admin-password");
    const isAdminAuthenticated = verifyAdminPassword(adminPassword);

    if (!isAdminAuthenticated) {
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

    const initialStatus = isAdminAuthenticated && body?.autoApprove === true ? "approved" : "pending";
    const stored = await createStoredReview(
      {
        name: data.name,
        role: data.role || "Propietario",
        business: data.business,
        city: data.city,
        category: data.category,
        rating: data.rating,
        comment: data.comment,
        contactInfo: data.contactInfo,
      },
      initialStatus
    );

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "https://www.isaacventas.com").replace(/\/$/, "");
    const moderationUrl = `${appUrl}/admin/resenas`;

    const starsText = "★".repeat(data.rating) + "☆".repeat(5 - data.rating);
    const subject = `[Nueva Reseña Cliente ${data.rating}★] ${data.business} (${data.city})`;

    const textContent = [
      "NUEVA RESEÑA DE CLIENTE PARA APROBACIÓN - ISAAC POS",
      "---------------------------------------------------",
      `ID Reseña: ${stored.id}`,
      `Estado inicial: ${stored.status.toUpperCase()}`,
      `Calificación: ${starsText} (${data.rating}/5)`,
      `Cliente: ${data.name} (${data.role || "Propietario"})`,
      `Comercio: ${data.business}`,
      `Ciudad: ${data.city}`,
      `Rubro: ${data.category}`,
      `Contacto de verificación (no público): ${data.contactInfo}`,
      "",
      "Comentario:",
      `"${data.comment}"`,
      "",
      `Panel para Aprobar / Rechazar: ${moderationUrl}`,
    ].join("\n");

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #0f172a; margin-top: 0;">Nueva Reseña de Cliente para Moderación</h2>
        <p style="font-size: 18px; color: #f59e0b; margin: 8px 0;"><strong>${escapeHtml(starsText)} (${data.rating}/5)</strong></p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
          <tr><td style="padding: 6px 0;"><strong>ID:</strong></td><td>${escapeHtml(stored.id)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Nombre:</strong></td><td>${escapeHtml(data.name)} (${escapeHtml(data.role || "Propietario")})</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Comercio:</strong></td><td>${escapeHtml(data.business)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Ciudad:</strong></td><td>${escapeHtml(data.city)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Rubro:</strong></td><td>${escapeHtml(data.category)}</td></tr>
          <tr><td style="padding: 6px 0;"><strong>Contacto Verificación:</strong></td><td>${escapeHtml(data.contactInfo)}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 6px; font-style: italic; color: #0f172a;">
          "${escapeHtml(data.comment)}"
        </div>
        <div style="margin-top: 20px;">
          <a href="${escapeHtml(moderationUrl)}" style="display: inline-block; padding: 10px 18px; background: #2563eb; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Abrir Panel de Moderación (Aprobar / Rechazar)
          </a>
        </div>
      </div>
    `;

    const notifyResult = await dispatchCommercialNotification({
      subject,
      text: textContent,
      html: htmlContent,
      webhookPayload: {
        type: "customer_review_submission",
        reviewId: stored.id,
        moderationUrl,
        ...data,
        submittedAt: stored.createdAt,
      },
    });

    const whatsappMessage = [
      `Hola equipo de Isaac POS, acabo de registrar mi reseña (#${stored.id.slice(-6)}) en la web:`,
      `• Calificación: ${data.rating}/5 estrellas`,
      `• Nombre: ${data.name} (${data.role || "Propietario"})`,
      `• Comercio: ${data.business} (${data.city} - ${data.category})`,
      `• Contacto de licencia: ${data.contactInfo}`,
      `• Experiencia: "${data.comment}"`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/584248302226?text=${encodeURIComponent(whatsappMessage)}`;

    return NextResponse.json({
      success: true,
      reviewId: stored.id,
      status: stored.status,
      notified: notifyResult.sent,
      fallbackWhatsapp: !notifyResult.sent,
      whatsappUrl,
      message:
        initialStatus === "approved"
          ? "Reseña creada y publicada directamente."
          : "Tu reseña quedó registrada en estado Pendiente y se publicará en cuanto el equipo verifique tu licencia.",
    });
  } catch (error) {
    console.error("[REVIEWS POST ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        error: "No se pudo procesar tu reseña en este momento.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const adminPassword = req.headers.get("x-admin-password");
    if (!verifyAdminPassword(adminPassword)) {
      return NextResponse.json(
        { success: false, error: "No autorizado. Clave de administrador inválida." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = ModerationPatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Datos de actualización inválidos." },
        { status: 400 }
      );
    }

    const updated = await updateStoredReviewStatus(parsed.data.id, parsed.data.status);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: "No se encontró la reseña solicitada." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      review: updated,
    });
  } catch (error) {
    console.error("[REVIEWS PATCH ERROR]", error);
    return NextResponse.json(
      { success: false, error: "No se pudo actualizar el estado de la reseña." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const adminPassword = req.headers.get("x-admin-password");
    if (!verifyAdminPassword(adminPassword)) {
      return NextResponse.json(
        { success: false, error: "No autorizado. Clave de administrador inválida." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = ModerationDeleteSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "ID de reseña inválido." },
        { status: 400 }
      );
    }

    const deleted = await deleteStoredReview(parsed.data.id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "No se encontró la reseña para eliminar." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("[REVIEWS DELETE ERROR]", error);
    return NextResponse.json(
      { success: false, error: "No se pudo eliminar la reseña." },
      { status: 500 }
    );
  }
}
