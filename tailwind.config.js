/** @type {import('tailwindcss').Config} */
// Import the unified design system configuration
const unifiedConfig = require('../shared-design-system/tailwind.config.js');

module.exports = {
  // Inherit all unified design system settings
  ...unifiedConfig,

  // Override content paths for this specific project
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    ...unifiedConfig.theme,
    extend: {
      ...unifiedConfig.theme.extend,

      // Game-specific color overrides while maintaining the unified system
      colors: {
        ...unifiedConfig.theme.extend.colors,

        // Keep game-specific colors for backward compatibility
        // but map them to the unified system structure
        cerulean: {
          DEFAULT: '#4380f6', // Map to enhanced vibrant blue
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#4380f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        'light-sea-green': {
          DEFAULT: '#12c49b', // Map to brighter emerald green
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#12c49b',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        'light-red': {
          DEFAULT: '#f64f6e', // Map to more vibrant red-pink
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#f64f6e',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },

        // Maintain some legacy colors for gradual migration
        sunset: {
          DEFAULT: '#ffcb77',
          50: '#fff5e6',
          100: '#ffe6b3',
          200: '#ffd780',
          300: '#ffc94d',
          400: '#ffbb1a',
          500: '#ffcb77',
          600: '#e6b766',
          700: '#cc9f55',
          800: '#b38744',
          900: '#996f33',
        },
        'floral-white': {
          DEFAULT: '#fef9ef',
          50: '#fffef5',
          100: '#fef5e2',
          200: '#fdebc9',
          300: '#fcdeb0',
          400: '#fbd497',
          500: '#fef9ef',
          600: '#e6dfd6',
          700: '#ccc6be',
          800: '#b3ada5',
          900: '#99938c',
        },
      },

      // Keep game-specific background images
      backgroundImage: {
        ...unifiedConfig.theme.extend.backgroundImage,
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'game-gradient': 'linear-gradient(135deg, #0d1015, #1c2634)',
      },

      // Game-specific animations
      keyframes: {
        ...unifiedConfig.theme.extend.keyframes,
        'gaming-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'score-pop': {
          '0%': { opacity: '0', transform: 'scale(0.5) translateY(20px)' },
          '50%': { opacity: '1', transform: 'scale(1.2) translateY(-10px)' },
          '100%': { opacity: '0', transform: 'scale(1) translateY(-30px)' },
        }
      },

      animation: {
        ...unifiedConfig.theme.extend.animation,
        'gaming-pulse': 'gaming-pulse 2s ease-in-out infinite',
        'score-pop': 'score-pop 1s ease-out forwards',
      }
    },
  },

  // Use unified plugins plus any game-specific ones
  plugins: [
    ...unifiedConfig.plugins,

    // Game-specific utilities
    function({ addUtilities }) {
      addUtilities({
        '.game-card': {
          background: 'rgba(28, 38, 52, 0.8)',
          border: '1px solid rgba(67, 128, 246, 0.3)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px 0 rgba(67, 128, 246, 0.2)',
        },
        '.game-button': {
          background: 'linear-gradient(135deg, #4380f6, #2563eb)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(67, 128, 246, 0.4)',
          }
        }
      });
    }
  ],
};
