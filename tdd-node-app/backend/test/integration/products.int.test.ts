import request from "supertest";
import { newProduct } from "../../dummy/products/newProduct";
import { IProduct } from "../../models/Product";
import { app } from "../../server";

let firstProduct: IProduct;

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
    firstProduct = body[0];
  });

  it("GET /api/products/:productId", async () => {
    const response = await request(app).get(`/api/products/${firstProduct._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(firstProduct.name);
    expect(response.body.description).toBe(firstProduct.description);
  });

  // it("GET id does not exist /api/products/:productId", async () => {
  //   const response = await request(app).get("/api/products/63022d9c895283b26113d15ff");

  //   expect(response.statusCode).toBe(404);
  // }, 10000);
});
