import request from "supertest";
import { app } from "../../server";

describe("GET product integration test", () => {
  it("GET /api/products", async () => {
    const { statusCode, body } = await request(app).get("/api/products");

    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body[0].name).toBeDefined();
    expect(body[0].description).toBeDefined();
  });
});
