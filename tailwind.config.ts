import type { Config } from 'tailwindcss'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import typography from '@tailwindcss/typography'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import forms from '@tailwindcss/forms'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#001F54',
        red: '#C8102E',
        white: '#FFFFFF',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-out forwards',
      },
    },
  },
  plugins: [typography, forms],
}

export default config