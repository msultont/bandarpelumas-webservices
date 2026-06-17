import request from "supertest";
import { app } from "./server";
import { describe, it, expect, test } from "@jest/globals";

describe("GET /", () => {
  it("should return 200 and 'Hello, World!'", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toEqual('{"message":"Hello, World!"}');
    expect(response.headers["content-type"]).toMatch(/application\/json/);
  });

  it("should correctly identify a mobile user agent", async () => {
    // We simulate a mobile device by setting the 'User-Agent' header
    const mobileUA =
      "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/0.4";

    const response = await request(app).get("/").set("User-Agent", mobileUA);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    // The console.log in server.ts will output "Received a Mobile request..."
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
      "PUT request received with message: Update Message",
    );
  });
});
