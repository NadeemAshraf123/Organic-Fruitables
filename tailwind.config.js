/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        pro: ['Source Sans Pro', 'sans-serif'],
      },
      screens:{
        'xl1440': '1440px',
      }
    },
  },
  plugins: [],
}
