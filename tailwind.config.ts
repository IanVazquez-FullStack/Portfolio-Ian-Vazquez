import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        border: {
          DEFAULT: "var(--border)",
          hover: "var(--border-hover)",
        },
        success: "var(--success)",
        error: "var(--error)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        display: [
          "clamp(2.5rem, 5vw + 1rem, 4rem)",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h1: [
          "clamp(2rem, 4vw + 0.5rem, 3rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.5rem, 3vw + 0.5rem, 2.25rem)",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        h3: [
          "clamp(1.25rem, 2vw + 0.5rem, 1.5rem)",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        "body-lg": [
          "clamp(1.0625rem, 1.2vw + 0.5rem, 1.25rem)",
          { lineHeight: "1.6" },
        ],
        body: ["1rem", { lineHeight: "1.6" }],
        caption: ["0.875rem", { lineHeight: "1.5" }],
        code: ["0.875rem", { lineHeight: "1.6" }],
      },
    },
  },
  plugins: [],
};

export default config;
