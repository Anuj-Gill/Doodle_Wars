/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'irish-grover': ['Irish Grover', 'sans-serif'],
      },
      animation: {
        'dots-shrink': 'spinners-react-dotted-shrin',
        'center-dot': 'spinners-react-dotted-center',
        'spin-slow': 'spin 3s linear infinite',

      }
    },
  },
  plugins: [],
}
