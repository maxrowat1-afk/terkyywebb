import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./public/index.html"],
  theme: {
    extend: {
      colors: {
        crimson: {
          50: "#fbf3f5",
          100: "#f6e3e8",
          200: "#edc8d1",
          300: "#e0a2b1",
          400: "#cd7089",
          500: "#b04a63",
          600: "#9b1d30",
          700: "#831a2a",
          800: "#6b1522",
          900: "#53111a",
          950: "#360a10",
        },
        champagne: "#c8a96a",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      boxShadow: {
        softer: "0 8px 30px -12px rgba(22,24,29,.10)",
        soft: "0 20px 60px -22px rgba(22,24,29,.16)",
        card: "0 1px 2px rgba(22,24,29,.05), 0 16px 40px -18px rgba(22,24,29,.12), inset 0 1px 0 rgba(255,255,255,.9)",
        "card-hover":
          "0 2px 4px rgba(22,24,29,.06), 0 28px 70px -22px rgba(22,24,29,.18), inset 0 1px 0 rgba(255,255,255,.9)",
        crimson: "0 12px 34px -10px rgba(155,29,48,.5)",
        "crimson-lg": "0 22px 60px -14px rgba(155,29,48,.6)",
      },
      animation: {
        "float-slow": "floatSlow 8s ease-in-out infinite",
        "pulse-dot": "pulseDot 2.4s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".5", transform: "scale(.75)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
