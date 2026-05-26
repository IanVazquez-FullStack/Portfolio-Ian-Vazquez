import { Resend } from "resend";
import type { ContactInput } from "@/lib/validation/contactSchema";

export async function sendContactEmail(
  data: ContactInput
): Promise<{ ok: boolean; error?: string }> {
  const requestId = crypto.randomUUID();

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[email]", requestId, "Missing RESEND_API_KEY");
      return { ok: false, error: "email_config_missing" };
    }

    const resend = new Resend(apiKey);

    const from = process.env.CONTACT_FROM_EMAIL;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!from || !to) {
      console.error("[email]", requestId, "Missing CONTACT_FROM_EMAIL or CONTACT_TO_EMAIL");
      return { ok: false, error: "email_config_missing" };
    }

    const { data: emailData, error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `[portfolio-ian] ${data.subject}`,
      html: `<h2>Nuevo mensaje desde portfolio-ian</h2>
<p><strong>Nombre:</strong> ${escapeHtml(data.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
<p><strong>Asunto:</strong> ${escapeHtml(data.subject)}</p>
<p><strong>Mensaje:</strong></p>
<p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>`,
    });

    if (error) {
      console.error("[email]", requestId, "Resend error:", error.message);
      return { ok: false, error: "email_send_failed" };
    }

    console.log("[email]", requestId, "Email sent:", emailData?.id);
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[email]", requestId, "Unexpected error:", message);
    return { ok: false, error: "email_send_failed" };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
