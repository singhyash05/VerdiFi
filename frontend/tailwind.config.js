/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'black-translucent': 'rgba(0, 0, 0, 0.7)',
        'black-translucent-light': 'rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
};