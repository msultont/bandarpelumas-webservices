import express, { Application, Request, Response } from "express";
import useragent from "express-useragent";





/* Variable Declarations */
const app: Application = express();
const port: number =  3000;





/* Middleware to parse JSON bodies */
app.use(express.json());
app.use(express.static("public")); // Serve static files from the "public" directory
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
// app.set("trust proxy", true); // Trust the first proxy





/* Basic Route */
app.get("/", async (req: Request, res: Response) => {
  // Access useragent properties safely.
  // Since express-useragent augments the request, we can destructure from req.useragent
  const { isMobile, isDesktop, isBot, browser, os, platform } = (req as any).useragent || {};

  console.log(`Received a ${isMobile ? "Mobile" : "Desktop"} request from ${browser} at ${new Date().toISOString()}`);

  res.status(200).json({ message: `Hello, World!` });
});

app.post("/", async (req: Request, res: Response) => {
  const { message } = req.body;
  res.status(201).json({ message: `POST request received with message: ${message}` });
});

app.put("/", (req: Request, res: Response) => {
  const { message } = req.body;
  res.status(200).json({ message: `PUT request received with message: ${message}` });
});





/* Start the server */
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
