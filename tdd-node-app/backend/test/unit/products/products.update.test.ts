import e, { NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import "jest";
import httpMocks from "node-mocks-http";
import QueryString from "qs";
import { updateProduct } from "../../../controller/product/productController.update";
import { newProduct } from "../../../dummy/products/newProduct";
import { Product } from "../../../models/Product";

const ProductUpdateById = Product.findByIdAndUpdate = jest.fn();

const TEST_PRODUCT_ID = "63022d9c895283b26113d15f";
const TEST_BODY = {
  name: "updated name",
  description: "updated description"
};

let req: httpMocks.MockRequest<e.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>>,
  res: httpMocks.MockResponse<e.Response<any, Record<string, any>>>,
  next: NextFunction;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product controller create", () => {
  beforeEach(() => {
    req.body = newProduct;
  });

  it("should have an updateProduct function", () => {
    expect(typeof updateProduct).toBe("function");
  });

  it("should call ProductModel findByIdUpdate", async () => {
    req.params.productId = TEST_PRODUCT_ID;
    req.body = TEST_BODY;

    await updateProduct(req, res, next);

    expect(ProductUpdateById).toHaveBeenCalledWith(
      req.params.productId,
      req.body,
      { new: true }
    );
  });

  it("should return json body and response code 200", async () => {
    req.params.productId = TEST_PRODUCT_ID;
    req.body = TEST_BODY;

    ProductUpdateById.mockReturnValue(TEST_BODY);
    await updateProduct(req, res, next);

    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(TEST_BODY);
  });

  it("should handle 404 when item does not exist", async () => {
    ProductUpdateById.mockReturnValue(null);
    await updateProduct(req, res, next);

    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error" };
    const rejectedPromise = Promise.reject(errorMessage);

    ProductUpdateById.mockReturnValue(rejectedPromise);
    await updateProduct(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
