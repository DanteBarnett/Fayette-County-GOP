/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./templates/**/*.html",
    "./home/templates/**/*.html",
    "./frontend/src/**/*.{js,ts,jsx,tsx}",
    "./static/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#1e3a8a',
          950: '#172554'
        },
        patriot: {
          red: '#dc2626',
          white: '#ffffff',
          blue: '#1e3a8a'
        },
        // Legacy support for existing classes
        patriotRed: '#dc2626',
        patriotBlue: '#1e3a8a',
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        // Legacy support
        montserrat: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionDuration: {
        '400': '400ms',
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
      rotate: {
        'y-180': '180deg',
      },
      transformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
      typography: {
        navy: {
          css: {
            '--tw-prose-body': '#1e3a8a',
            '--tw-prose-headings': '#172554',
            '--tw-prose-lead': '#3730a3',
            '--tw-prose-links': '#dc2626',
            '--tw-prose-bold': '#172554',
            '--tw-prose-counters': '#3730a3',
            '--tw-prose-bullets': '#3730a3',
            '--tw-prose-hr': '#c7d2fe',
            '--tw-prose-quotes': '#172554',
            '--tw-prose-quote-borders': '#c7d2fe',
            '--tw-prose-captions': '#3730a3',
            '--tw-prose-code': '#172554',
            '--tw-prose-pre-code': '#e0e7ff',
            '--tw-prose-pre-bg': '#172554',
            '--tw-prose-th-borders': '#c7d2fe',
            '--tw-prose-td-borders': '#e0e7ff',
          },
        },
        white: {
          css: {
            '--tw-prose-body': '#ffffff',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-lead': '#e5e7eb',
            '--tw-prose-links': '#fca5a5',
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-counters': '#d1d5db',
            '--tw-prose-bullets': '#d1d5db',
            '--tw-prose-hr': '#4b5563',
            '--tw-prose-quotes': '#ffffff',
            '--tw-prose-quote-borders': '#6b7280',
            '--tw-prose-captions': '#d1d5db',
            '--tw-prose-code': '#ffffff',
            '--tw-prose-pre-code': '#d1d5db',
            '--tw-prose-pre-bg': '#1f2937',
            '--tw-prose-th-borders': '#4b5563',
            '--tw-prose-td-borders': '#374151',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // Custom plugin for 3D transforms
    function({ addUtilities }) {
      const newUtilities = {
        '.perspective-1000': {
          perspective: '1000px',
        },
        '.preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
        '.line-clamp-3': {
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}