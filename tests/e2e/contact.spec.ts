import { test, expect } from "@playwright/test";

const validFormData = {
  name: "Ian Vázquez",
  email: "ian@example.com",
  subject: "Consulta",
  message: "Mensaje de prueba con suficientes caracteres.",
};

async function fillContactForm(page: typeof test.prototype.page) {
  await page.locator("#contact-name").type(validFormData.name, { delay: 20 });
  await page.locator("#contact-email").type(validFormData.email, { delay: 20 });
  await page.locator("#contact-subject").type(validFormData.subject, { delay: 20 });
  await page.locator("#contact-message").type(validFormData.message, { delay: 20 });
}

test.describe("ContactForm E2E", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
    // Esperar a que el formulario esté hidratado e interactivo
    await page.waitForSelector("#contact-name");
    await page.waitForTimeout(200);
  });

  test("flujo completo de éxito: envío y panel de confirmación", async ({ page }) => {
    // Mock endpoint success
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ok: true, message: "Enviado" }),
        headers: { "Content-Type": "application/json" },
      });
    });

    await fillContactForm(page);
    await page.getByRole("button", { name: /enviar/i }).click();

    // Verificar panel de éxito
    await expect(page.getByText(/mensaje enviado correctamente/i)).toBeVisible();
    await expect(page.getByText(/me pondré en contacto a la brevedad/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /enviar otro mensaje/i })).toBeVisible();

    // El formulario ya no debe existir
    await expect(page.locator("form")).toHaveCount(0);
  });

  test("error de red: mensaje accionable y datos preservados", async ({ page }) => {
    // Mock endpoint error 500
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        body: JSON.stringify({ ok: false, error: "Server error" }),
        headers: { "Content-Type": "application/json" },
      });
    });

    await fillContactForm(page);
    await page.getByRole("button", { name: /enviar/i }).click();

    // Verificar mensaje de error accionable
    await expect(page.getByText(/no pude enviar el mensaje/i)).toBeVisible();
    await expect(page.getByText(/revisá tu conexión/i)).toBeVisible();

    // Verificar que los datos se preservaron
    await expect(page.locator("#contact-name")).toHaveValue(validFormData.name);
    await expect(page.locator("#contact-email")).toHaveValue(validFormData.email);
    await expect(page.locator("#contact-subject")).toHaveValue(validFormData.subject);
    await expect(page.locator("#contact-message")).toHaveValue(validFormData.message);

    // Botón debe decir "Reintentar envío"
    await expect(page.getByRole("button", { name: /reintentar envío/i })).toBeVisible();
  });

  test("retry después de error vuelve a idle y permite reenvío exitoso", async ({ page }) => {
    let requestCount = 0;

    await page.route("/api/contact", async (route) => {
      requestCount++;
      if (requestCount === 1) {
        await route.fulfill({
          status: 500,
          body: JSON.stringify({ ok: false, error: "Server error" }),
          headers: { "Content-Type": "application/json" },
        });
      } else {
        await route.fulfill({
          status: 200,
          body: JSON.stringify({ ok: true, message: "Enviado" }),
          headers: { "Content-Type": "application/json" },
        });
      }
    });

    await fillContactForm(page);
    await page.getByRole("button", { name: /enviar/i }).click();

    // Esperar error
    await expect(page.getByText(/no pude enviar el mensaje/i)).toBeVisible();

    // Reintentar
    await page.getByRole("button", { name: /reintentar envío/i }).click();

    // Verificar éxito
    await expect(page.getByText(/mensaje enviado correctamente/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /enviar otro mensaje/i })).toBeVisible();
  });

  test("error 400 con fieldErrors aplica errores a campos específicos", async ({ page }) => {
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 400,
        body: JSON.stringify({
          ok: false,
          error: "Datos inválidos",
          fieldErrors: { email: ["Formato inválido"] },
        }),
        headers: { "Content-Type": "application/json" },
      });
    });

    await fillContactForm(page);
    await page.getByRole("button", { name: /enviar/i }).click();

    // Verificar error en campo específico
    await expect(page.getByText(/formato inválido/i)).toBeVisible();

    // Otros campos preservan sus valores
    await expect(page.locator("#contact-name")).toHaveValue(validFormData.name);
    await expect(page.locator("#contact-subject")).toHaveValue(validFormData.subject);
  });

  test("'enviar otro mensaje' resetea el formulario limpio", async ({ page }) => {
    await page.route("/api/contact", async (route) => {
      await route.fulfill({
        status: 200,
        body: JSON.stringify({ ok: true, message: "Enviado" }),
        headers: { "Content-Type": "application/json" },
      });
    });

    await fillContactForm(page);
    await page.getByRole("button", { name: /enviar/i }).click();

    // Esperar éxito
    await expect(page.getByText(/mensaje enviado correctamente/i)).toBeVisible();

    // Click en "Enviar otro mensaje"
    await page.getByRole("button", { name: /enviar otro mensaje/i }).click();

    // Verificar formulario limpio
    await expect(page.locator("#contact-name")).toHaveValue("");
    await expect(page.locator("#contact-email")).toHaveValue("");
    await expect(page.locator("#contact-subject")).toHaveValue("");
    await expect(page.locator("#contact-message")).toHaveValue("");

    // Botón debe volver a decir "Enviar"
    await expect(page.getByRole("button", { name: /^enviar$/i })).toBeVisible();
  });
});
