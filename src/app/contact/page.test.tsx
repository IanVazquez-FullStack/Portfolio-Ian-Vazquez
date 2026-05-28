import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactPage } from "./page";

describe("ContactPage", () => {
  it("renderiza la CTA principal, el formulario y los canales de contacto con subject prellenado", async () => {
    render(<ContactPage searchParams={Promise.resolve({ ref: "portfolio-ian" })} />);

    expect(screen.getByRole("heading", { level: 1, name: /trabajemos juntos/i })).toBeDefined();
    expect(
      screen.getByText(/preferís hablar por otro canal, también podés contactarme aquí/i)
    ).toBeDefined();

    expect((screen.getByLabelText(/asunto/i) as HTMLInputElement).value).toBe(
      "Consulta sobre proyecto: portfolio-ian"
    );

    expect(screen.getByRole("link", { name: /linkedin/i }).getAttribute("href")).toContain(
      "linkedin.com"
    );
    expect(screen.getByRole("link", { name: /github/i }).getAttribute("href")).toContain(
      "github.com"
    );
    expect(screen.getByRole("link", { name: /email/i }).getAttribute("href")).toContain(
      "mailto:"
    );
    expect(screen.getByRole("link", { name: /fiverr/i }).getAttribute("href")).toContain(
      "fiverr.com"
    );
  });
});
