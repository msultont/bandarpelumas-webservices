import express, { Application, Request, Response } from "express";
import useragent from "express-useragent";
import { z } from "zod";

interface UseragentProperties {
	isMobile?: boolean;
	isDesktop?: boolean;
	isBot?: boolean;
	browser?: string;
	os?: string;
	platform?: string;
}

/* Zod Schemas for Validation */
const postRequestBodySchema = z.object({
	message: z
		.string()
		.min(1, "Message is required")
		.max(5000, "Message must not exceed 5000 characters")
		.trim(),
	requestId: z.string().uuid("Invalid request ID format").optional(),
	source: z.enum(["web", "mobile", "api"]).optional(),
	timestamp: z.date().optional(),
});

type PostRequestBody = z.infer<typeof postRequestBodySchema>;

const userSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(100, "Name must be less than 100 characters"),
	email: z.email("Invalid email address"),
	age: z
		.number()
		.int("Age must be an integer")
		.min(0, "Age must be positive")
		.max(150, "Age must be less than 150"),
});

type User = z.infer<typeof userSchema>;

/* Response Body Interfaces */
interface MessageResponse {
	message: string;
}

interface UserAgentResponse extends MessageResponse {
	userAgent: UseragentProperties;
}

interface ErrorResponse {
	error: string;
}

interface UserCreateResponse {
	message: string;
	id: string;
	user: User;
}

/* Variable Declarations */
const app: Application = express();
const port: number = 3000;
export {
	app,
	PostRequestBody,
	User,
	MessageResponse,
	UserAgentResponse,
	ErrorResponse,
	UserCreateResponse,
};

/* Middleware to parse JSON bodies */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
app.set("trust proxy", true); // Trust the first proxy

app.use((req: Request, _res: Response, next) => {
	const { isMobile, isDesktop, isBot, browser }: UseragentProperties =
		req.useragent || {};
	const deviceType = isMobile
		? "Mobile"
		: isDesktop
			? "Desktop"
			: isBot
				? "Bot"
				: "Unknown";

	console.log(
		`Received a ${deviceType} ${req.method} request for ${req.originalUrl} from ${browser || "Unknown"} at ${new Date().toISOString()}`
	);

	next();
});

app.use(express.static("public")); // Serve static files from the "public" directory

/* Basic Route */
app.get("/", (req: Request, res: Response) => {
	const {
		isMobile,
		isDesktop,
		isBot,
		browser,
		os,
		platform,
	}: UseragentProperties = req.useragent || {};

	return res.status(200).json({
		message: `Hello, World!`,
		userAgent: {
			isMobile,
			isDesktop,
			isBot,
			browser,
			os,
			platform,
		},
	});
});

app.post("/", (req: Request<PostRequestBody>, res: Response) => {
	try {
		const validatedBody = postRequestBodySchema.parse(req.body);

		return res.status(201).json({
			message: `POST request received with message: ${validatedBody.message}`,
			requestId: validatedBody.requestId,
			source: validatedBody.source,
			timestamp: validatedBody.timestamp || new Date().toISOString(),
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({
				error: "Validation Error",
				details: error.issues,
			});
		}
		return res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred",
		});
	}
});

app.put("/", (req: Request, res: Response) => {
	try {
		const validatedBody = postRequestBodySchema.parse(req.body);

		return res.status(200).json({
			message: `PUT request received with message: ${validatedBody.message}`,
			requestId: validatedBody.requestId,
			source: validatedBody.source,
			timestamp: validatedBody.timestamp || new Date().toISOString(),
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({
				error: "Validation Error",
				details: error.issues,
			});
		}
		return res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred",
		});
	}
});

app.post("/users", (req: Request, res: Response) => {
	try {
		const validatedUser: User = userSchema.parse(req.body);

		const userId = Math.random().toString(36).substr(2, 9);

		return res.status(201).json({
			message: "User created successfully",
			id: userId,
			user: validatedUser,
		});
	} catch (error) {
		if (error instanceof z.ZodError) {
			return res.status(400).json({
				error: "Validation Error",
				details: error.issues,
			});
		}
		return res.status(500).json({
			error: "Internal Server Error",
			message: "An unexpected error occurred",
		});
	}
});

/* 404 Handler - Catch all non-matching routes */
app.use((req: Request, res: Response) => {
	res.status(404).json({
		error: "Not Found",
		message: `Route ${req.method} ${req.path} does not exist`,
	});
});

/* Start the server */
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
