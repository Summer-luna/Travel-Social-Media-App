/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#587BF6",
        "primary-hover-color": "#4865d3",
        "form-input-color": "#f0f0f0",
        "form-icon-color": "#acacac",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      spacing: {
        375: "1500px",
        500: "2000px",
      },
      zIndex: {
        60: "60",
        70: "70",
      },
    },
  },
  plugins: [],
};
