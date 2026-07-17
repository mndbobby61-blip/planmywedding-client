import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        plum: {
          50: "#F1E8F6",
          200: "#E8DCEF",
          400: "#8C6BA0",
          600: "#4A2E63",
          700: "#3C2A4D",
          900: "#2E1B3D",
        },
        gold: {
          50: "#FBF3E4",
          200: "#E0C68F",
          400: "#D9B26C",
          600: "#B8894A",
          800: "#8A6234",
        },
        blush: {
          400: "#ED93B1",
          600: "#9C3D6B",
          800: "#6B2447",
        },
        ivory: "#FAF7F5",
        charcoal: "#2A2622",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
