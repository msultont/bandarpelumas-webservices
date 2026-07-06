import request from "supertest";
import { app } from "./app";
import type {
    UserAgentResponse,
    UserCreateResponse,
    ErrorResponse,
} from "./types";
import { describe, it, expect } from "@jest/globals";

function getBody<T>(response: request.Response): T {
    return response.body as T;
}

describe("GET /", () => {
    it("should return 200 and { message: 'Hello, World!' }", async () => {
        const response: request.Response = await request(app).get("/");
        const body: UserAgentResponse = getBody<UserAgentResponse>(response);

        expect(response.status).toBe(200);
        expect(body.message).toBe("Hello, World!");
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should correctly identify a desktop user agent", async () => {
        // We simulate a desktop device by setting the 'User-Agent' header
        const desktopUA: string =
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

        const response: request.Response = await request(app)
            .get("/")
            .set("User-Agent", desktopUA);

        const body: UserAgentResponse = getBody<UserAgentResponse>(response);
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(body.userAgent.isMobile).toBe(false);
        expect(body.userAgent.isDesktop).toBe(true);
    });

    it("should correctly identify a mobile user agent", async () => {
        // We simulate a mobile device by setting the 'User-Agent' header
        const mobileUA: string =
            "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/0.4";

        const response: request.Response = await request(app)
            .get("/")
            .set("User-Agent", mobileUA);

        const body: UserAgentResponse = getBody<UserAgentResponse>(response);
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(body.userAgent.isMobile).toBe(true);
        expect(body.userAgent.isDesktop).toBe(false);
    });

    it("should return 201 for POST request", async () => {
        const response: request.Response = await request(app)
            .post("/")
            .send({ message: "Test Message" });
        const body: UserAgentResponse = getBody<UserAgentResponse>(response);
        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(body.message).toContain("POST request received");
    });

    it("should return 200 for PUT request", async () => {
        const response: request.Response = await request(app)
            .put("/")
            .send({ message: "Update Message" });
        const body: UserAgentResponse = getBody<UserAgentResponse>(response);
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(body.message).toBe(
            "PUT request received with message: Update Message",
        );
    });
});

describe("POST / - Request Validation", () => {
    it("should handle POST with empty body", async () => {
        const response = await request(app).post("/").send({});

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should handle POST with missing message field", async () => {
        const response = await request(app).post("/").send({ name: "John" });

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should handle POST with null message", async () => {
        const response = await request(app).post("/").send({ message: null });

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should handle POST with undefined message", async () => {
        const response = await request(app)
            .post("/")
            .send({ message: undefined });

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should handle POST with empty string message", async () => {
        const response = await request(app).post("/").send({ message: "" });

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should handle POST with non-string message", async () => {
        const response = await request(app).post("/").send({ message: 12345 });

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should handle POST with very long message", async () => {
        const longMessage = "a".repeat(10000);
        const response = await request(app)
            .post("/")
            .send({ message: longMessage });

        expect(response.status).toBe(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
});

describe("PUT / - Request Validation", () => {
    it("should handle PUT with empty body", async () => {
        const response = await request(app).put("/").send({});

        expect(response.status).toBeGreaterThanOrEqual(400);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });
});

describe("POST /users - Request Validation", () => {
    it("should create a new user when provided with valid data", async () => {
        const response: request.Response = await request(app)
            .post("/users")
            .send({
                name: "John Doe",
                email: "john.doe@example.com",
                age: 30,
            });
        const body = getBody<UserCreateResponse>(response);
        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(body.message).toBe("User created successfully");
        expect(body).toHaveProperty("id");
        expect(body).toHaveProperty("user");
        expect(body.user).toEqual({
            name: "John Doe",
            email: "john.doe@example.com",
            age: 30,
        });
    });
});

describe("404 Not Found", () => {
    it("should return 404 for non-existent GET route", async () => {
        const response = await request(app).get("/nonexistent");
        const body = getBody<ErrorResponse>(response);
        expect(response.status).toBe(404);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(body.error).toBe("Not Found");
    });

    it("should return 404 for non-existent POST route", async () => {
        const response = await request(app)
            .post("/nonexistent")
            .send({ message: "Test" });
        const body = getBody<ErrorResponse>(response);
        expect(response.status).toBe(404);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(body.error).toBe("Not Found");
    });

    it("should return 404 for non-existent PUT route", async () => {
        const response = await request(app)
            .put("/nonexistent")
            .send({ message: "Test" });
        const body = getBody<ErrorResponse>(response);
        expect(response.status).toBe(404);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(body.error).toBe("Not Found");
    });

    it("should return 404 for deeply nested non-existent route", async () => {
        const response = await request(app).get("/api/v1/users/123");
        const body = getBody<ErrorResponse>(response);
        expect(response.status).toBe(404);
        expect(body.error).toBe("Not Found");
    });

    it("should return appropriate error message for 404", async () => {
        const response = await request(app).get("/not-found");
        const body = getBody<ErrorResponse>(response);
        expect(response.status).toBe(404);
        expect(body.error).toBe("Not Found");
    });
});
