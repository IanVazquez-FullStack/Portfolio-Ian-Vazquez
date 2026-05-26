import { describe, it, expect } from "vitest";
import { contactSchema } from "./contactSchema";

describe("contactSchema", () => {
  const validInput = {
    name: "Ian Vázquez",
    email: "ian@example.com",
    subject: "Consulta de proyecto",
    message: "Este es un mensaje de prueba con más de diez caracteres.",
  };

  it("pasa con input válido", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("falla con email malformado", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      email: "no-es-email",
    });
    expect(result.success).toBe(false);
  });

  it("falla con message corto (< 10 caracteres)", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      message: "corto",
    });
    expect(result.success).toBe(false);
  });

  it("permite honeypot company con contenido (no lo rechaza el schema)", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      company: "Spam Corp",
    });
    expect(result.success).toBe(true);
  });

  it("falla con name < 2 caracteres", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "A",
    });
    expect(result.success).toBe(false);
  });

  it("falla con name > 100 caracteres", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      name: "A".repeat(101),
    });
    expect(result.success).toBe(false);
  });

  it("falla con subject < 3 caracteres", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      subject: "AB",
    });
    expect(result.success).toBe(false);
  });

  it("falla con subject > 200 caracteres", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      subject: "S".repeat(201),
    });
    expect(result.success).toBe(false);
  });

  it("falla con message > 5000 caracteres", () => {
    const result = contactSchema.safeParse({
      ...validInput,
      message: "M".repeat(5001),
    });
    expect(result.success).toBe(false);
  });
});
