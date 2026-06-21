import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		open: true,
		host: "0.0.0.0",
		strictPort: true,
		proxy: {
			"/api": {
				// Use 127.0.0.1 instead of 'localhost' to bypass Node.js DNS resolution delays
				target: "http://127.0.0.1:5173",
				changeOrigin: true,
				secure: false,
				// Optional: remove '/api' prefix before sending requests to backend
				rewrite: (path) => path.replace(/^\/api/, ""),
				// Optional: enable proxying websockets for real-time applications
				ws: true,
			},
		},
	},
});
