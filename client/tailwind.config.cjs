/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'wa-primary': '#01A38B',
        'wa-secondary': '#FF5A38',
        'wa-light-green': '#E1F4F3',
        'wa-white': '#ffffff',
        'wa-light': '#FAFAFA',
        'wa-light-gray': '#F0F2F5',
        'wa-dark-gray': '#bac0c9',
        'wa-dark-1': '#19223E;',
        'wa-dark-2': '#1A2036;',
        'wa-dark-3': '#2E3650;',
        'wa-dark-light': '#4D5670',
      },
      screens: {
        sm: '460px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
