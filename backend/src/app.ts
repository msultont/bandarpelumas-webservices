import "dotenv/config";
import express, { Application } from "express";
import useragent from "express-useragent";
import cors, { CorsOptions } from "cors";
import path from "path";
import { requestLogger } from "./middleware/logger";
import router from "./routes";

export const app: Application = express();
const allowedOrigins: string[] = [
	"https://msultont.github.io", // Your frontend origin
	"http://127.0.0.1:5173", // Local Vite dev server
	"http://localhost:5173",
];
const corsOptions: CorsOptions = {
	origin: (
		origin: string | undefined,
		callback: (err: Error | null, allow?: boolean) => void
	) => {
		if (!origin) {
			return callback(null, true);
		}
		if (allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Blocked by CORS policy"), false);
		}
	},
	credentials: true,
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization", "X-Visitor-ID"], // Include tracking headers here
};
app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // Enable pre-flight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
if (process.env.NODE_ENV === "production") {
	app.set("trust proxy", 1); // Trust first proxy in production
} else {
	app.set("trust proxy", "loopback"); // Trust loopback proxy in development
}
app.use(requestLogger);
app.use(express.static(path.join(__dirname, "../public")));
app.use(router);
