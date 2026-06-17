import express, { Application, Request, Response } from "express";
import useragent from "express-useragent";

interface UseragentProperties {
    isMobile?: boolean;
    isDesktop?: boolean;
    isBot?: boolean;
    browser?: string;
    os?: string;
    platform?: string;
}

interface PostRequestBody {
    message: string;
}

/* Variable Declarations */
const app: Application = express();
const port: number = 3000;
export { app };

/* Middleware to parse JSON bodies */
app.use(express.json());
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
// app.set("trust proxy", true); // Trust the first proxy

/* Basic Route */
// TODO: test useragent properties in the request handler by using different user agents (e.g., mobile vs desktop browsers) and logging the results to the console.
app.get("/", async (req: Request, res: Response) => {
    // Access useragent properties safely.
    // Since express-useragent augments the request, we can destructure from req.useragent
    const {
        isMobile,
        isDesktop,
        isBot,
        browser,
        os,
        platform,
    }: UseragentProperties = (req as Request).useragent || {};

    console.log(
        `Received a ${isMobile ? "Mobile" : "Desktop"} request from ${browser} at ${new Date().toISOString()}`
    );

    res.status(200).json({
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

app.post("/", async (req: Request, res: Response) => {
    const { message }: PostRequestBody = req.body;
    res.status(201).json({
        message: `POST request received with message: ${message}`,
    });
});

app.put("/", (req: Request, res: Response) => {
    const { message }: PostRequestBody = req.body;
    res.status(200).json({
        message: `PUT request received with message: ${message}`,
    });
});

/* Start the server */
app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
});
