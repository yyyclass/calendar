const colors = require('tailwindcss/colors');
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './tailwind.components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
       colors:{
         yyy: { // bg-yyy-yellow
           'yellow': '#F39800',
         },
       }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
