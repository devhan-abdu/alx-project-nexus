/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App/**/*', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: "#C7326A",
        foreground: '#FFFFF0',
      },
    },
  },
  plugins: [],
};
