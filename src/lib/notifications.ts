import nodemailer from "nodemailer";

export interface DispatchNotificationPayload {
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  webhookPayload?: Record<string, unknown>;
}

export interface DispatchNotificationResult {
  sent: boolean;
  emailSent: boolean;
  webhookSent: boolean;
  configuredChannels: number;
  recipients: string[];
}

const DEFAULT_RECIPIENTS = ["mrivero105@gmail.com", "isaacpospage@gmail.com"];

export function getNotificationRecipients(): string[] {
  const raw = process.env.NOTIFICATION_EMAILS || process.env.NOTIFICATION_EMAIL || "";
  const parsed = raw
    .split(",")
    .map((e) => e.trim())
    .filter((e) => e.includes("@"));
  return parsed.length > 0 ? parsed : DEFAULT_RECIPIENTS;
}

export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function sanitizeHeaderText(str: string): string {
  return str.replace(/[\r\n]+/g, " ").trim();
}

/**
 * Envía notificaciones comerciales vía Gmail SMTP, Resend API o Webhook externo.
 * Informa con exactitud si al menos un canal confirmó entrega real.
 */
export async function dispatchCommercialNotification(
  payload: DispatchNotificationPayload
): Promise<DispatchNotificationResult> {
  const recipients = getNotificationRecipients();
  const gmailPass = process.env.GMAIL_PASS?.trim();
  const gmailUser = process.env.GMAIL_USER?.trim() || "isaacpospage@gmail.com";
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();

  let configuredChannels = 0;
  let emailSent = false;
  let webhookSent = false;

  if (gmailPass) {
    configuredChannels += 1;
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, ""),
        },
      });

      for (const recipient of recipients) {
        try {
          await transporter.sendMail({
            from: `"Isaac POS Ultra" <${gmailUser}>`,
            to: recipient,
            replyTo: payload.replyTo,
            subject: sanitizeHeaderText(payload.subject),
            text: payload.text,
            html: payload.html,
          });
          emailSent = true;
        } catch (recipientErr) {
          console.error(`[EMAIL ERROR - GMAIL SMTP to ${recipient}]`, recipientErr);
        }
      }
    } catch (smtpErr) {
      console.error("[EMAIL ERROR - GMAIL SMTP]", smtpErr);
    }
  }

  if (!emailSent && resendApiKey) {
    configuredChannels += 1;
    for (const recipient of recipients) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL?.trim() || "Isaac POS Leads <onboarding@resend.dev>",
            to: [recipient],
            reply_to: payload.replyTo,
            subject: sanitizeHeaderText(payload.subject),
            html: payload.html,
            text: payload.text,
          }),
        });

        if (resendRes.ok) {
          emailSent = true;
        } else {
          const errData = await resendRes.text();
          console.warn(`[EMAIL NOTICE - RESEND ${recipient}]`, errData);
        }
      } catch (resendErr) {
        console.error(`[EMAIL ERROR - RESEND ${recipient}]`, resendErr);
      }
    }
  }

  if (webhookUrl && payload.webhookPayload) {
    configuredChannels += 1;
    try {
      const hookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload.webhookPayload),
      });
      if (hookRes.ok) {
        webhookSent = true;
      } else {
        console.warn("[WEBHOOK NOTICE]", hookRes.status);
      }
    } catch (hookErr) {
      console.error("[WEBHOOK ERROR]", hookErr);
    }
  }

  if (configuredChannels === 0) {
    console.warn(
      "[NOTIFICATION WARNING] No hay GMAIL_PASS, RESEND_API_KEY ni LEAD_WEBHOOK_URL configurados."
    );
  }

  return {
    sent: emailSent || webhookSent,
    emailSent,
    webhookSent,
    configuredChannels,
    recipients,
  };
}
