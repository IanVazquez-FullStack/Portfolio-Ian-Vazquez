import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

function fillForm() {
  fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ian Vazquez" } });
  fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "ian@example.com" } });
  fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: "Consulta" } });
  fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "Mensaje de prueba con suficientes caracteres." } });
}

describe("ContactForm", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("renderiza todos los campos con labels visibles", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/nombre/i)).toBeDefined();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeDefined();
    expect(screen.getByLabelText(/asunto/i)).toBeDefined();
    expect(screen.getByLabelText(/mensaje/i)).toBeDefined();
  });

  it("incluye honeypot company oculto visualmente", () => {
    render(<ContactForm />);

    const honeypotWrapper = screen.getByLabelText(/company/i).closest("div");
    expect(honeypotWrapper?.getAttribute("aria-hidden")).toBe("true");

    const honeypotInput = screen.getByLabelText(/company/i);
    expect(honeypotInput.getAttribute("tabindex")).toBe("-1");
    expect(honeypotInput.getAttribute("autocomplete")).toBe("off");
    expect(honeypotInput.getAttribute("aria-hidden")).toBe("true");
  });

  it("aplica aria-invalid y aria-describedby en inputs con error", async () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/nombre/i);
    fireEvent.focus(nameInput);
    fireEvent.blur(nameInput);

    await waitFor(() => {
      expect(nameInput.getAttribute("aria-invalid")).toBe("true");
      expect(nameInput.getAttribute("aria-describedby")).toBeTruthy();
    });

    const errorId = nameInput.getAttribute("aria-describedby");
    expect(errorId).toBeTruthy();
    const errorMessage = document.getElementById(errorId!);
    expect(errorMessage?.getAttribute("role")).toBe("alert");
  });

  it("muestra mensaje de error por campo tras validación onBlur", async () => {
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/correo electrónico/i);
    fireEvent.focus(emailInput);
    fireEvent.change(emailInput, { target: { value: "no-es-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeDefined();
    });
  });

  it("deshabilita el botón y muestra 'Enviando...' durante el envío", async () => {
    const mockFetch = vi.fn(() => new Promise<Response>(() => {}));
    vi.stubGlobal("fetch", mockFetch);

    render(<ContactForm />);
    fillForm();

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /enviando/i })).toBeDefined();
    });

    const loadingButton = screen.getByRole("button", { name: /enviando/i });
    expect(loadingButton.hasAttribute("disabled")).toBe(true);
  });

  it("transiciona a success tras envío exitoso via fetch", async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, message: "Enviado" }), { status: 200 })
    );
    vi.stubGlobal("fetch", mockFetch);

    render(<ContactForm />);
    fillForm();

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText(/mensaje enviado correctamente/i)).toBeDefined();
    });

    // Panel de éxito reemplaza el formulario
    expect(document.querySelector("form")).toBeNull();
    expect(screen.getByRole("button", { name: /enviar otro mensaje/i })).toBeDefined();
  });

  it("transiciona a error cuando fetch falla (red o 500)", async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: "Server error" }), { status: 500 })
    );
    vi.stubGlobal("fetch", mockFetch);

    render(<ContactForm />);
    fillForm();

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert.textContent).toMatch(/no pude enviar el mensaje/i);
    });
  });

  it("preserva datos del formulario en error de envío", async () => {
    const mockFetch = vi.fn().mockRejectedValue(new Error("Network error"));
    vi.stubGlobal("fetch", mockFetch);

    render(<ContactForm />);
    fillForm();

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeDefined();
    });

    expect((screen.getByLabelText(/nombre/i) as HTMLInputElement).value).toBe("Ian Vazquez");
    expect((screen.getByLabelText(/correo electrónico/i) as HTMLInputElement).value).toBe("ian@example.com");
    expect((screen.getByLabelText(/asunto/i) as HTMLInputElement).value).toBe("Consulta");
    expect((screen.getByLabelText(/mensaje/i) as HTMLTextAreaElement).value).toBe("Mensaje de prueba con suficientes caracteres.");
  });

  it("aplica fieldErrors del servidor (400) sin perder otros valores", async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({ ok: false, error: "Datos inválidos", fieldErrors: { email: ["Formato inválido"] } }),
        { status: 400 }
      )
    );
    vi.stubGlobal("fetch", mockFetch);

    render(<ContactForm />);
    fillForm();

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      const emailError = screen.getByText(/formato inválido/i);
      expect(emailError).toBeDefined();
    });

    // Otros campos preservan sus valores
    expect((screen.getByLabelText(/nombre/i) as HTMLInputElement).value).toBe("Ian Vazquez");
    expect((screen.getByLabelText(/asunto/i) as HTMLInputElement).value).toBe("Consulta");
  });

  it("botón 'Enviar otro mensaje' resetea a idle limpio", async () => {
    const mockFetch = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true, message: "Enviado" }), { status: 200 })
    );
    vi.stubGlobal("fetch", mockFetch);

    render(<ContactForm />);
    fillForm();

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /enviar otro mensaje/i })).toBeDefined();
    });

    fireEvent.click(screen.getByRole("button", { name: /enviar otro mensaje/i }));

    await waitFor(() => {
      expect((screen.getByLabelText(/nombre/i) as HTMLInputElement).value).toBe("");
      expect((screen.getByLabelText(/asunto/i) as HTMLInputElement).value).toBe("");
    });
  });

  it("inputs cumplen min-h-[44px]", () => {
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/nombre/i);
    const emailInput = screen.getByLabelText(/correo electrónico/i);
    const subjectInput = screen.getByLabelText(/asunto/i);

    expect(nameInput.className).toContain("min-h-11");
    expect(emailInput.className).toContain("min-h-11");
    expect(subjectInput.className).toContain("min-h-11");
  });

  it("prellena el asunto cuando se pasa defaultSubject", () => {
    render(
      <ContactForm
        defaultSubject="Consulta sobre proyecto: portfolio-ian"
      />
    );

    expect((screen.getByLabelText(/asunto/i) as HTMLInputElement).value).toBe(
      "Consulta sobre proyecto: portfolio-ian"
    );
  });

  it("llama a onSubmit prop cuando se proporciona (compatibilidad)", async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmit={mockSubmit} />);

    fillForm();

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Ian Vazquez",
          email: "ian@example.com",
          subject: "Consulta",
          message: "Mensaje de prueba con suficientes caracteres.",
        })
      );
    });

    // Panel de éxito aparece tras onSubmit exitoso
    await waitFor(() => {
      expect(screen.getByText(/mensaje enviado correctamente/i)).toBeDefined();
    });
  });
});
