import express, { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic Route
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello, World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
