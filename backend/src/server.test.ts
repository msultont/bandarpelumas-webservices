import request from "supertest";
import { app } from "./server";
import { describe, it, expect, test } from "@jest/globals";

describe("GET /", () => {
    it("should return 200 and { message: 'Hello, World!' }", async () => {
        const response = await request(app).get("/");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Hello, World!");
        expect(response.body.userAgent).toBeDefined();
        expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    it("should correctly identify a desktop user agent", async () => {
        // We simulate a desktop device by setting the 'User-Agent' header
        const desktopUA =
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

        const response = await request(app)
            .get("/")
            .set("User-Agent", desktopUA);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body.userAgent.isMobile).toBe(false);
        expect(response.body.userAgent.isDesktop).toBe(true);
    });

    it("should correctly identify a mobile user agent", async () => {
        // We simulate a mobile device by setting the 'User-Agent' header
        const mobileUA =
            "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/0.4";

        const response = await request(app)
            .get("/")
            .set("User-Agent", mobileUA);

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body.userAgent.isMobile).toBe(true);
        expect(response.body.userAgent.isDesktop).toBe(false);
    });

    it("should return 201 for POST request", async () => {
        const response = await request(app)
            .post("/")
            .send({ message: "Test Message" });
        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body.message).toContain("POST request received");
    });

    it("should return 200 for PUT request", async () => {
        const response = await request(app)
            .put("/")
            .send({ message: "Update Message" });

        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.body.message).toBe(
            "PUT request received with message: Update Message"
        );
    });
});
