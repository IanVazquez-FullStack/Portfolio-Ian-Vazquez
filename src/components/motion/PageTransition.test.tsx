import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { PageTransition } from "./PageTransition";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>(
    "framer-motion"
  );
  return {
    ...actual,
    useReducedMotion: vi.fn(),
  };
});

import { useReducedMotion } from "framer-motion";

describe("PageTransition", () => {
  afterEach(() => {
    cleanup();
  });

  it("renderiza children con animación activada", () => {
    vi.mocked(useReducedMotion).mockReturnValue(false);

    render(
      <PageTransition>
        <div data-testid="child">Contenido de prueba</div>
      </PageTransition>
    );

    expect(screen.getByTestId("child")).toBeTruthy();
    expect(screen.getByText("Contenido de prueba")).toBeTruthy();
  });

  it("renderiza directamente children sin animación cuando useReducedMotion es true", () => {
    vi.mocked(useReducedMotion).mockReturnValue(true);

    const { container } = render(
      <PageTransition>
        <div data-testid="child-reduced">Sin animación</div>
      </PageTransition>
    );

    expect(screen.getByTestId("child-reduced")).toBeTruthy();
    // Sin motion.div wrapper, solo debe haber el div hijo directamente
    expect(container.firstElementChild?.getAttribute("data-testid")).toBe(
      "child-reduced"
    );
  });

  it("no anima durante SSR cuando useReducedMotion retorna null", () => {
    vi.mocked(useReducedMotion).mockReturnValue(null);

    const { container } = render(
      <PageTransition>
        <div data-testid="child-ssr">SSR</div>
      </PageTransition>
    );

    expect(screen.getByTestId("child-ssr")).toBeTruthy();
    // En SSR (null), debe ser conservador y no animar
    expect(container.firstElementChild?.getAttribute("data-testid")).toBe(
      "child-ssr"
    );
  });
});
