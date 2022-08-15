import 'jest';
import httpMocks from 'node-mocks-http';
import { createProduct } from "../../controller/productController";
import { Product } from '../../models/Product';
import { newProduct } from '../dummy/newProduct';

Product.create = jest.fn();

describe("Product controller create", () => {
  it('should have a createProduct function', () => {
    expect(typeof createProduct).toBe('function');
  })

  it('should call ProductModel.create', () => {
    const req = httpMocks.createRequest();
    req.body = newProduct;

    const res = httpMocks.createResponse();

    let next = null;

    createProduct(req, res, next);
    expect(Product.create).toBeCalledWith(newProduct);
  })
})