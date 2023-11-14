/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          mainColor: "",
          icons: "rgba(255, 255, 255, 0.3)",
        }
      }
    },
  },
  plugins: [],
}