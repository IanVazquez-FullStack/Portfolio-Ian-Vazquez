import { describe, it, expect } from "vitest";
import { ok, fail, type ApiResponse } from "./responses";

describe("ApiResponse helpers", () => {
  describe("ok", () => {
    it("retorna Response con status 200 y ok: true", () => {
      const response = ok("data");
      expect(response.status).toBe(200);
      expect(response.headers.get("content-type")).toContain("application/json");
    });

    it("incluye data y message cuando se proporcionan", async () => {
      const response = ok({ id: 1 }, "Guardado");
      const body = (await response.json()) as ApiResponse<{ id: number }>;
      expect(body).toEqual({ ok: true, data: { id: 1 }, message: "Guardado" });
    });

    it("omite data y message cuando no se proporcionan", async () => {
      const response = ok();
      const body = (await response.json()) as ApiResponse<unknown>;
      expect(body).toEqual({ ok: true });
    });
  });

  describe("fail", () => {
    it("retorna Response con status 400 por defecto", () => {
      const response = fail("Error de validación");
      expect(response.status).toBe(400);
    });

    it("permite override de status", () => {
      const response = fail("Rate limit", undefined, 429);
      expect(response.status).toBe(429);
    });

    it("incluye error y fieldErrors cuando se proporcionan", async () => {
      const fieldErrors = { email: ["Formato inválido"] };
      const response = fail("Validación fallida", fieldErrors);
      const body = (await response.json()) as ApiResponse<unknown>;
      expect(body).toEqual({
        ok: false,
        error: "Validación fallida",
        fieldErrors,
      });
    });

    it("incluye status 500 para errores inesperados", () => {
      const response = fail("Error interno", undefined, 500);
      expect(response.status).toBe(500);
    });
  });
});
