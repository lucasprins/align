import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './src/index.html',
  },
  tools: {
    postcss: () => {
      return {
        postcssOptions: {
          plugins: [require('tailwindcss')],
        },
      }
    },
  },
})
