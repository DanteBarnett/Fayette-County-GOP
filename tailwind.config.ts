import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#001f3f',
          light: '#003366',
        },
        accent: '#B31942',
      },
    },
  },
  plugins: [],
};

export default config;