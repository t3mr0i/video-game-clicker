/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cerulean: {
          DEFAULT: '#227c9d',
          // Define other shades if necessary
          600: '#1e7085',
        },
        'light-sea-green': {
          DEFAULT: '#17c3b2',
          // Define other shades if necessary
          600: '#159a91',
        },
        sunset: {
          DEFAULT: '#ffcb77',
          // Define other shades if necessary
          600: '#e6b766',
        },
        'floral-white': {
          DEFAULT: '#fef9ef',
          // Define other shades if necessary
          600: '#e6dfd6',
        },
        'light-red': {
          DEFAULT: '#fe6d73',
          // Define other shades if necessary
          600: '#e66268',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      // Add other theme extensions if necessary
    },
  },
  plugins: [],


};
