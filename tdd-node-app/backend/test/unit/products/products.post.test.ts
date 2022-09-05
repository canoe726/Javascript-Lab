import e from "express";
import { ParamsDictionary } from "express-serve-static-core";
import "jest";
import httpMocks from "node-mocks-http";
import QueryString from "qs";
import { createProduct } from "../../../controller/product/productController.post";
import { newProduct } from "../../../dummy/products/newProduct";
import { Product } from "../../../models/Product";

const ProductCreate = Product.create = jest.fn();

let req: httpMocks.MockRequest<e.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>>,
  res: httpMocks.MockResponse<e.Response<any, Record<string, any>>>,
  next: any; // middleware function -> error handling

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product controller create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it("should have a createProduct function", () => {
    expect(typeof createProduct).toBe("function");
  });

  it("should call ProductModel.create", async () => {
    await createProduct(req, res, next);

    expect(ProductCreate).toBeCalledWith(newProduct);
  });

  it("should return 201 response code", async () => {
    await createProduct(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    ProductCreate.mockReturnValue(newProduct);

    await createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "description property is missing" };
    const rejectedPromise = Promise.reject(errorMessage);

    ProductCreate.mockReturnValue(rejectedPromise);
    await createProduct(req, res, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
