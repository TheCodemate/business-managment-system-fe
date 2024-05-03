/** @type {import('tailwindcss').Config} */
export default {
  important: "#root",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
      // colors: {
      // border: "hsl(var(--border))",
      // input: "hsl(var(--input))",
      // ring: "hsl(var(--ring))",
      // background: "hsl(var(--background))",
      // foreground: "hsl(var(--foreground))",
      // primary: {
      //   DEFAULT: "hsl(var(--primary))",
      //   foreground: "hsl(var(--primary-foreground))",
      // },
      // secondary: {
      //   DEFAULT: "hsl(var(--secondary))",
      //   foreground: "hsl(var(--secondary-foreground))",
      // },
      // destructive: {
      //   DEFAULT: "hsl(var(--destructive))",
      //   foreground: "hsl(var(--destructive-foreground))",
      // },
      // muted: {
      //   DEFAULT: "hsl(var(--muted))",
      //   foreground: "hsl(var(--muted-foreground))",
      // },
      // accent: {
      //   DEFAULT: "hsl(var(--accent))",
      //   foreground: "hsl(var(--accent-foreground))",
      // },
      // popover: {
      //   DEFAULT: "hsl(var(--popover))",
      //   foreground: "hsl(var(--popover-foreground))",
      // },
      // card: {
      //   DEFAULT: "hsl(var(--card))",
      //   foreground: "hsl(var(--card-foreground))",
      // },
      // },
      // borderRadius: {
      //   lg: `var(--radius)`,
      //   md: `calc(var(--radius) - 2px)`,
      //   sm: "calc(var(--radius) - 4px)",
      // },
      // fontFamily: {
      // sans: ["var(--font-sans)", ...fontFamily.sans],
      // },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
