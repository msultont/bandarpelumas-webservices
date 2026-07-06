import { app } from "./app";

const port: number = 3000;
const host: string = "0.0.0.0";

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
