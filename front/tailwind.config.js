/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#54806F", // Добавление вашего цвета
        secondary: "#ADD8E6",
        customGray: {
          light: "#f7f7f7",
          DEFAULT: "#d6d6d6",
          dark: "#a1a1a1",
        },
      },
    },
  },
  darkMode: "class",
  // plugins: [require("tw-elements-react/dist/plugin.cjs")],
}
