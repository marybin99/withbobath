/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        hana: ["Hana_handwriting", "sans-serif"],
        jua: ["Jua", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#1C7F00",
          light: "#E4EDDC",
        },
        secondary: {
          DEFAULT: "#7CA172",
          light: "#D2E5CC",
        },
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1920px",
        },
      },
    },
  },
  plugins: [],
};
