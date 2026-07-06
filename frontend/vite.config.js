import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
    plugins: [react()],
    base: mode === "production" ? "/bandarpelumas-webservices/" : "/",
    server: {
        port: 5173,
        open: true,
        host: true,
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
                configure: (proxy, _options) => {
                    proxy.on("proxyReq", (proxyReq, req, _res) => {
                        const clientIp = req.socket.remoteAddress;
                        if (clientIp) {
                            proxyReq.setHeader("X-Forwarded-For", clientIp);
                        }
                    });
                },
            },
        },
    },
}));
