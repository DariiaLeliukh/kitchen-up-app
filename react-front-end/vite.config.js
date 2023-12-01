import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Change this to your Express backend's URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,  
      },
      '/socket.io': {
        target: 'http://localhost:8080', // Change this to your Express backend's URL
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
