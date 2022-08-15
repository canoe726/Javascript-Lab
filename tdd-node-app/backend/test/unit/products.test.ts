import e from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import 'jest';
import httpMocks from 'node-mocks-http';
import QueryString from 'qs';
import { createProduct } from "../../controller/productController";
import { Product } from '../../models/Product';
import { newProduct } from '../dummy/newProduct';

Product.create = jest.fn();

let req: httpMocks.MockRequest<e.Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>>,
    res: httpMocks.MockResponse<e.Response<any, Record<string, any>>>,
    next: any;

beforeEach(() => {
  req = httpMocks.createRequest();  
  res = httpMocks.createResponse();
  next = null;
})

describe("Product controller create", () => {
  beforeEach(() => {
    req.body = newProduct;
  })

  it('should have a createProduct function', () => {
    expect(typeof createProduct).toBe('function');
  })

  it('should call ProductModel.create', () => {
    createProduct(req, res, next);

    expect(Product.create).toBeCalledWith(newProduct);
  })

  it('should return 201 response code', () => {
    createProduct(req, res, next);
    
    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  })
})
