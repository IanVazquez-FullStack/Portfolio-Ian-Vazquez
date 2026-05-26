import { NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation/contactSchema";
import { sendContactEmail } from "@/lib/email/sendContactEmail";
import { ok, fail } from "@/lib/api/responses";

export async function POST(req: NextRequest) {
  const requestId = crypto.randomUUID();

  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return fail("La solicitud debe contener un cuerpo JSON válido.", undefined, 400);
    }

    const result = contactSchema.safeParse(body);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return fail("Datos de formulario inválidos.", fieldErrors, 400);
    }

    const { company } = result.data;

    // Honeypot: si el campo 'company' tiene contenido, descartamos silenciosamente
    if (company && company.trim() !== "") {
      return ok(undefined, "Mensaje enviado correctamente.");
    }

    const emailResult = await sendContactEmail(result.data);

    if (!emailResult.ok) {
      console.error("[contact]", requestId, "Email failed:", emailResult.error);
      return fail(
        "No pude enviar el mensaje. Revisá tu conexión e intentá de nuevo.",
        undefined,
        500
      );
    }

    return ok(undefined, "Mensaje enviado correctamente.");
  } catch (error) {
    console.error("[contact]", requestId, error);
    return fail(
      "No pude enviar el mensaje. Revisá tu conexión e intentá de nuevo.",
      undefined,
      500
    );
  }
}

export async function GET() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}

export async function PUT() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}

export async function DELETE() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}

export async function PATCH() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
