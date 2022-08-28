import e from "express";
import { ParamsDictionary } from "express-serve-static-core";
import "jest";
import httpMocks from "node-mocks-http";
import QueryString from "qs";
import { getProductById, getProducts } from "../../../controller/product/productController.get";
import { allProduct } from "../../../dummy/products/allProduct";
import { Product } from "../../../models/Product";

const ProductGet = Product.find = jest.fn();
const ProductGetById = Product.findById = jest.fn();

const TEST_PRODUCT_ID = "63022d9c895283b26113d15f";

let req: httpMocks.MockRequest<e.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>>,
  res: httpMocks.MockResponse<e.Response<any, Record<string, any>>>,
  next: any; // middleware function -> error handling

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product controller get all", () => {
  it("should have a getProducts function", () => {
    expect(typeof getProducts).toBe("function");
  });

  // {}: 조건없이 모든 값 가져온다는 의미
  it("should call ProdocutModel.find({})", async () => {
    await getProducts(req, res, next);
    expect(ProductGet).toHaveBeenCalledWith({});
  });

  it("should return 200 response", async () => {
    await getProducts(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled).toBeTruthy();
  });

  it("should return json body in response", async () => {
    ProductGet.mockReturnValue(allProduct);
    await getProducts(req, res, next);
    expect(res._getJSONData()).toStrictEqual(allProduct);
  });

  it("should handle errors", async () => {
    const errorMessage = { message: "Error finding product data" };
    const rejectedPromise = Promise.reject(errorMessage);

    ProductGet.mockReturnValue(rejectedPromise);
    await getProducts(req, res, next);
    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe("Product controller get by Id", () => {
  it("should have a get product by id", () => {
    expect(typeof getProductById).toBe("function");
  });

  it("should call product find by id", async () => {
    req.params.productId = TEST_PRODUCT_ID;

    await getProductById(req, res, next);
    expect(ProductGetById).toBeCalledWith(TEST_PRODUCT_ID);
  });
});
