import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

describe("ContactForm", () => {
  afterEach(() => {
    cleanup();
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
    const mockSubmit = vi.fn(() => new Promise<void>(() => {}));
    render(<ContactForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ian Vázquez" } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "ian@example.com" } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: "Consulta" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "Mensaje de prueba con suficientes caracteres." } });

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: /enviando/i })).toBeDefined();
    });

    const loadingButton = screen.getByRole("button", { name: /enviando/i });
    expect(loadingButton.hasAttribute("disabled")).toBe(true);
  });

  it("transiciona a success tras envío exitoso", async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ian Vázquez" } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "ian@example.com" } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: "Consulta" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "Mensaje de prueba con suficientes caracteres." } });

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      const status = screen.getByRole("status");
      expect(status.textContent).toMatch(/enviado correctamente/i);
    });
  });

  it("transiciona a error cuando onSubmit falla", async () => {
    const mockSubmit = vi.fn().mockRejectedValue(new Error("Fallo"));
    render(<ContactForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ian Vázquez" } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "ian@example.com" } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: "Consulta" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "Mensaje de prueba con suficientes caracteres." } });

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      const alert = screen.getByRole("alert");
      expect(alert.textContent).toMatch(/ocurrió un error/i);
    });
  });

  it("llama a onSubmit con los datos del formulario", async () => {
    const mockSubmit = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm onSubmit={mockSubmit} />);

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Ian Vázquez" } });
    fireEvent.change(screen.getByLabelText(/correo electrónico/i), { target: { value: "ian@example.com" } });
    fireEvent.change(screen.getByLabelText(/asunto/i), { target: { value: "Consulta" } });
    fireEvent.change(screen.getByLabelText(/mensaje/i), { target: { value: "Mensaje de prueba con suficientes caracteres." } });

    const form = document.querySelector("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Ian Vázquez",
          email: "ian@example.com",
          subject: "Consulta",
          message: "Mensaje de prueba con suficientes caracteres.",
        })
      );
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
});
