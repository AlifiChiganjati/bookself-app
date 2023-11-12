/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#F9F7F7",
        gray: "#DBE2EF",
        primary: "#3F72AF",
        secondary: "#112D4E",
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
