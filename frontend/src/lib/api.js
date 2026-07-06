import axios from "axios";

/**
 * Axios instance pre-configured for the Express backend.
 * All requests use the /api prefix which Vite proxies to
 * http://127.0.0.1:3000 in development (rewriting /api → /).
 */
const api = axios.create({
	baseURL: "https://bandarpelumas-webservices-backend.vercel.app",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

export default api;
