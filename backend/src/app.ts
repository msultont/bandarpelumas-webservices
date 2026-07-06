import express, { Application } from "express";
import useragent from "express-useragent";
import { requestLogger } from "./middleware/logger";
import router from "./routes";

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(useragent.express());
if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1); // Trust first proxy in production
} else {
    app.set("trust proxy", "loopback"); // Trust loopback proxy in development
}
app.use(requestLogger);
app.use(express.static("public"));
app.use(router);
