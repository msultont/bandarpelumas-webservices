import { app } from "./app";

const port: number = 5555;
const host: string = "0.0.0.0";

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
