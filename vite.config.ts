import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // отключение sourcemap в продакшн сборке
    minify: 'terser', // использование terser для минификации
    terserOptions: {
      compress: {
        drop_console: true, // удаление всех console.log
      },
    },
  },
})
