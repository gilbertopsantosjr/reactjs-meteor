/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./ui/**/*.js', './client/*.html'],
  theme: {
    extend: {
      transitionDuration: {
        5000: '5000ms',
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
