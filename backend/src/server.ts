import { app } from "./app";

const port: number = 3000;
const host: string = "https://bandarpelumas-webservices-backend.vercel.app/";

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
