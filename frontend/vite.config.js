import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/bandarpelumas-webservices/",
  server: {
    port: 5173,
    open: true,
    host: "0.0.0.0",
    strictPort: true,
    proxy: {
      "/api": {
        // Forward /api/* requests to the Express backend on port 3000
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        secure: false,
        // Strip /api prefix before forwarding: /api → /
        rewrite: (path) => path.replace(/^\/api/, ""),
        ws: true,
      },
    },
  },
});
