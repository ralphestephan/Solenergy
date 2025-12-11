// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#F4B41A", // Solar yellow from logo
          orange: "#E8952F", // Warm energy orange
          blue: "#143D59", // Deep professional blue
          gray: "#2C3E50", // Industrial gray
          green: "#27AE60", // Sustainable green accent
        },
      },
      borderRadius: {
        card: "40px",
      },
      boxShadow: {
        soft: "10px 12px 20px rgba(0,0,0,0.10)",
      },

      /* Add these */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
        // you already used this name on Solutions tabs:
        "tab-in-slow": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        // Smooth infinite scroll for carousels
        scroll: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
      },
      animation: {
        // snappy
        "accordion-down": "accordion-down 200ms ease-out",
        "accordion-up": "accordion-up 200ms ease-in",
        "tabIn-slow": "tab-in-slow 480ms cubic-bezier(.22,1,.36,1)",
        // Smooth infinite scroll
        scroll: "scroll 15s linear infinite",

        // if you want softer timing instead, swap these in:
        // "accordion-down": "accordion-down 320ms cubic-bezier(0.22, 1, 0.36, 1)",
        // "accordion-up": "accordion-up 260ms cubic-bezier(0.22, 1, 0.36, 1)",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
 

  

    },
  },
  plugins: [],
};

export default config;
