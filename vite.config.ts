/// <reference types="vitest" />

import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },

  server: {
    watch: {
      ignored: ['**/db.json', '**/.vinxi/**'],
    },
  },

  plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()],
})
