/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui"

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C0203A",
          dark: "#8B0F26",
          light: "#E8354F",
        },
        accent: {
          DEFAULT: "#E8A838",
          dark: "#C48A1A",
        },
        surface: {
          DEFAULT: "#13131F",
          card: "#1C1C2E",
          elevated: "#222235",
        },
        border: "#2A2A3E",
        safe: "#22C55E",
        danger: "#EF4444",
        muted: "#9A9AAF",
        base: "#0D0D14",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["DM Sans", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(ellipse at top left, #1C0A10 0%, #0D0D14 50%, #0A0A18 100%)",
        "card-gradient": "linear-gradient(135deg, #1C1C2E 0%, #13131F 100%)",
        "primary-gradient": "linear-gradient(135deg, #C0203A 0%, #8B0F26 100%)",
        "gold-gradient": "linear-gradient(135deg, #E8A838 0%, #C48A1A 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "33%": { transform: "translateY(-15px) rotate(1deg)" },
          "66%": { transform: "translateY(-8px) rotate(-1deg)" },
        },
        slideUp: {
          "0%": { transform: "translateY(40px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(192, 32, 58, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(192, 32, 58, 0.7)" },
        },
      },
      boxShadow: {
        "primary-glow": "0 0 30px rgba(192, 32, 58, 0.4)",
        "gold-glow": "0 0 20px rgba(232, 168, 56, 0.3)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.6), 0 0 20px rgba(192,32,58,0.15)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: false,
    base: false,
  },
}