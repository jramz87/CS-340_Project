import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 7013,
    allowedHosts: [
      'https://818faf39e330.ngrok-free.app',
      'localhost',
      '127.0.0.1'
    ]
  }
})
