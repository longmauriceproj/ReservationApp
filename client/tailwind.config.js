/** @type {import('tailwindcss').Config} */
// TODO: change the theme to light mode instead of the default dark mode
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
