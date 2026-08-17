import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1d4ed8",
        secondary: "#7c3aed",
        success: "#16a34a",
        danger: "#dc2626",
        warning: "#d97706",
        background: "#f8fafc",
      },
      fontFamily: {
        sans: ["Geist", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
