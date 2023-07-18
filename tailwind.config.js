/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F5385D',
        error: '#C13515',
        edit: '#004CC4',
        delete: '#C13515',
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '800px',
      // => @media (min-width: 800px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      searchbar: '880px',
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
