import type { Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui'],
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
