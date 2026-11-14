import type { Config } from "tailwindcss";

export default {
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
        brand: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
          950: "#052e16",
        },
        slate: {
          850: "#151e2e",
          950: "#080c14",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      spacing: {
        15: "3.75rem",
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgb(0 0 0 / 0.03)",
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px) scale(0.99)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        inEnter: {
          "0%": {
            opacity: "var(--tw-enter-opacity, 1)",
            transform: "translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0)",
          },
          "100%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeIn: "fadeIn 0.2s ease-out both",
        in: "inEnter 0.2s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
