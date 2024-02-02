/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        pc: "800px",
        mobile: { min: "1px", max: " 799px" }
      }
    }
  },
  plugins: []
};
