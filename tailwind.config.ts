import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fffdf2",
          100: "#fff9c6",
          200: "#fff28a",
          300: "#fee64e",
          400: "#fcd31c",
          500: "#F5C542", // Primary gold accent requested
          600: "#d9a108",
          700: "#ad7607",
          800: "#8c5b0c",
          900: "#73490f",
        },
        navy: {
          950: "#05070e",
          900: "#0a0e1c",
          850: "#0f162c",
          800: "#151d3b",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "fade-in-up": "fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        "gold-glow": "0 0 25px -3px rgba(245, 197, 66, 0.35), 0 0 10px -2px rgba(245, 197, 66, 0.2)",
        "gold-glow-lg": "0 0 40px -2px rgba(245, 197, 66, 0.45), 0 0 20px -2px rgba(245, 197, 66, 0.3)",
        "blue-glow": "0 0 30px -4px rgba(99, 102, 241, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
    },
  },
  plugins: [],
};
export default config;
