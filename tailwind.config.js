/** @type {import('tailwindcss').Config} */

export default {
  important: "#root",
  darkMode: [""],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./@/**/*.{ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        inset: [
          "-10px -10px 10px rgba(255, 255, 255, 0.7)",
          "10px 10px 10px rgba(174, 174, 192, 0.2)",
        ],
      },
      scale: {
        101: "1.01",
      },
      transitionProperty: {
        gridTemplateRows: "grid-template-rows",
      },

      colors: {
        primary: "#141414",
        alternate: "#FBFBFB",
        neutral600: "#475569",
        neutral100: "#F1F5F9",
        bgPrimary: "#FBFBFB",
        bgSecondary: "#e7e6e6",
        fontDetail: "#FBFBFB",
        details: "#B6B6B6",
        textPrimary: "#4A4A4A",
        textSecondary: "#B6B6B6",
        textDetail: "#5A5A5A",
        textAlternate: "#FBFBFB",
        redPrimary: "#FF6C6C",
        redSecondary: "#DD3B3B",
        bluePrimary: "#6C95FF",
        blueSecondary: "#3E3BDD",
        backdropDimmed: "rgba(0,0,0, 0.5)",
        confirmBasic: "#85FF6D",
        confirmAlternate: "#22CC00",
        elementsColor: "#4A4A4A",
      },
    },

    plugins: [require("tailwindcss-animate")],
  },
};
