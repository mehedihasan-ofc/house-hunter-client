/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {},
    fontFamily: {
      'primary': ['Roboto', 'sans-serif'],
    }
  },
  plugins: [require("daisyui")],
}

