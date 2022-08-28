import e from "express";
import { ParamsDictionary } from "express-serve-static-core";
import "jest";
import httpMocks from "node-mocks-http";
import QueryString from "qs";
import { getProducts } from "../../../controller/product/productController.get";
import { allProduct } from "../../../dummy/allProduct";
import { Product } from "../../../models/Product";

const ProductGet = Product.find = jest.fn();

let req: httpMocks.MockRequest<e.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>>,
  res: httpMocks.MockResponse<e.Response<any, Record<string, any>>>,
  next: any; // middleware function -> error handling

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe("Product controller get", () => {
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
});
