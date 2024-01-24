/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#141414",
      alternate: "#FBFBFB",
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
    extend: {},
  },
  plugins: [],
};
