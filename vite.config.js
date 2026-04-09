import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    base: '/HRM-Bench-Mark/',
    port: 5173,
    host: '192.168.1.151',
    open: true,
  },
})
