import 'jest';
import { createProduct } from "../../controller/productController";
import { Product } from '../../models/Product';

Product.create = jest.fn();

describe("Product controller create", () => {
  it('should have a createProduct function', () => {
    expect(typeof createProduct).toBe('function');
  })

  it('should call ProductModel.create', () => {
    createProduct();
    expect(Product.create).toBeCalled();
  })
})