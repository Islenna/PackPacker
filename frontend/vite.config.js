import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost', // Change this to your desired hostname or IP address
    port: 3000, // Change this to your desired port number
  },
  plugins: [react()],
})
