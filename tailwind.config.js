/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: "0 0 16px rgba(167, 139, 250, 0.2), 0 0 2px rgb(125, 211, 252)"
      },
      gridTemplateColumns: {
        autofit: "repeat(auto-fit, 384px)"
      },
      backgroundColor: {
        dark: "rgb(15, 23, 37)"
      }
    },
  },
  plugins: [],
}

