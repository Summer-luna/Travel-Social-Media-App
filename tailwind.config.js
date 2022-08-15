/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#31343C",
        "primary-hover-color": "#3662E3",
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
      borderRadius: {
        "half-full": "100% 200%",
      },
    },
  },
  plugins: [],
};
