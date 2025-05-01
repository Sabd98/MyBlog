/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#547792",
        secondary: "#94B4C1",
        accent: "#ce5c00",
        dialogOverlay: "rgba(0, 0, 0, 0.75)",
        flatHover: "#edd2ff",
      },
    },
  },
  plugins: [],
};
  