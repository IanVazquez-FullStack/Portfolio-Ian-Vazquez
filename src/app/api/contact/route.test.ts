import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST, GET, PUT, DELETE, PATCH } from "./route";
import { NextRequest } from "next/server";
import * as emailModule from "@/lib/email/sendContactEmail";

describe("POST /api/contact", () => {
  const createMockRequest = (body: Record<string, unknown>) => {
    return new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(emailModule, "sendContactEmail").mockResolvedValue({ ok: true });
  });

  it("retorna 200 y éxito para datos de contacto válidos", async () => {
    const req = createMockRequest({
      name: "Juan Perez",
      email: "juan@example.com",
      subject: "Consulta de trabajo",
      message: "Hola, me interesa tu perfil de desarrollo para un proyecto.",
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toEqual({
      ok: true,
      message: "Mensaje enviado correctamente.",
    });
  });

  it("retorna 400 y errores de campos si faltan datos obligatorios", async () => {
    const req = createMockRequest({
      name: "", // Inválido (min 2)
      email: "not-an-email", // Inválido
      subject: "Hi", // Inválido (min 3)
      message: "Short", // Inválido (min 10)
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.ok).toBe(false);
    expect(data.error).toBe("Datos de formulario inválidos.");
    expect(data.fieldErrors).toBeDefined();
    expect(data.fieldErrors.name).toBeDefined();
    expect(data.fieldErrors.email).toBeDefined();
    expect(data.fieldErrors.subject).toBeDefined();
    expect(data.fieldErrors.message).toBeDefined();
  });

  it("retorna 400 si el body no es un JSON válido", async () => {
    const req = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: "invalid-json",
      headers: {
        "content-type": "application/json",
      },
    });

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data).toEqual({
      ok: false,
      error: "La solicitud debe contener un cuerpo JSON válido.",
    });
  });

  it("descarta silenciosamente con honeypot (company presente) retornando 200 sin enviar email", async () => {
    // Si company tiene contenido, debe actuar como honeypot y retornar 200 ok
    const req = createMockRequest({
      name: "Bot Spencer",
      email: "bot@spencer.com",
      subject: "Buy cheap medications",
      message: "We offer the best pharmaceutical products online.",
      company: "Spam Company Inc.", // Honeypot activado
    });

    const res = await POST(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toEqual({
      ok: true,
      message: "Mensaje enviado correctamente.",
    });
  });

  it("retorna 500 y mensaje genérico si ocurre un error interno", async () => {
    const req = createMockRequest({
      name: "Juan Perez",
      email: "juan@example.com",
      subject: "Consulta de trabajo",
      message: "Hola, me interesa tu perfil de desarrollo para un proyecto.",
    });

    const { contactSchema } = await import("@/lib/validation/contactSchema");
    const safeParseSpy = vi.spyOn(contactSchema, "safeParse").mockImplementationOnce(() => {
      throw new Error("Simulated database/internal error");
    });

    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(req);
    expect(res.status).toBe(500);

    const data = await res.json();
    expect(data).toEqual({
      ok: false,
      error: "No pude enviar el mensaje. Revisá tu conexión e intentá de nuevo.",
    });

    expect(consoleErrorSpy).toHaveBeenCalled();
    consoleErrorSpy.mockRestore();
    safeParseSpy.mockRestore();
  });
});

describe("Métodos HTTP no permitidos en /api/contact", () => {
  it("GET retorna 405 con cabecera Allow: POST", async () => {
    const res = await GET();
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("POST");
  });

  it("PUT retorna 405 con cabecera Allow: POST", async () => {
    const res = await PUT();
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("POST");
  });

  it("DELETE retorna 405 con cabecera Allow: POST", async () => {
    const res = await DELETE();
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("POST");
  });

  it("PATCH retorna 405 con cabecera Allow: POST", async () => {
    const res = await PATCH();
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("POST");
  });
});
