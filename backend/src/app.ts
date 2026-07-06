import "dotenv/config";
import express, { Application } from "express";
import useragent from "express-useragent";
import cors from "cors";
import path from "path";
import { requestLogger } from "./middleware/logger";
import router from "./routes";

const allowedOrigins = [
	"https://msultont.github.io/bandarpelumas-webservices/", // Your frontend origin
	"http://127.0.0.1:5173", // Local Vite dev server
	"http://localhost:5173",
];

export const app: Application = express();

app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin) {
				callback(null, true);
				return;
			}
			if (allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Blocked by CORS policy"));
			}
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization", "X-Visitor-ID"], // Include tracking headers here
	})
);

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
