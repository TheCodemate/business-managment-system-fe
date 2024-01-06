/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#6225AF",
      alternate: "#FBFBFB",
      bgPrimary: "#FBFBFB",
      bgSecondary: "",
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
    },
    extend: {},
  },
  plugins: [],
};
