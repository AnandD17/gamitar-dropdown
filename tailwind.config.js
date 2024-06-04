/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        opacityin: {
          '0%': { opacity:0 },
          '100%': { opacity:1 },
        }
      },
      animation: {
        fadein: 'opacityin 1s ease-in-out',
      }
    },
  },
  plugins: [],
};
