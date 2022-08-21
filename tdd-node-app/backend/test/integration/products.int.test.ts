import request from "supertest";
import { app } from "../../server";
import { newProduct } from "../dummy/newProduct";

describe(("products integration test"), () => {
  it("POST /api/products", async () => {
    const { statusCode, body } = await request(app)
      .post("/api/products")
      .send(newProduct);

    expect(statusCode).toBe(201);
    expect(body.name).toBe(newProduct.name);
    expect(body.description).toBe(newProduct.description);
  });

  it("should return 500 on POST /api/products", async () => {
    const { statusCode } = await request(app)
      .post("/api/products")
      .send({ name: "phone" });

    expect(statusCode).toBe(500);
  });
});
