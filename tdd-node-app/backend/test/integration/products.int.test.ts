import request from "supertest";
import { newProduct } from "../../dummy/products/newProduct";
import { app } from "../../server";

describe(("POST products integration test"), () => {
  it("POST /api/products", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/products")
      .send(newProduct);

    expect(statusCode).toBe(201);
    expect(body.name).toBe(newProduct.name);
    expect(body.description).toBe(newProduct.description);
  });

  it("should return 500 on POST /api/products", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/products")
      .send({ name: "phone" });

    expect(statusCode).toBe(500);
    expect(body).toStrictEqual({ message: "Product validation failed: description: Path `description` is required." });
  });
});

describe("GET product integration test", () => {
  it("GET /api/products", async () => {
    const { statusCode, body } = await request(app).get("/api/products");

    expect(statusCode).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
    expect(body[0].name).toBeDefined();
    expect(body[0].description).toBeDefined();
  });
});
