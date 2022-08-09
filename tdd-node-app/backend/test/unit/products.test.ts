import 'jest';
import { createProduct } from "../../controller/productController";

describe("Product controller create", () => {
  it('should have a createProduct function', () => {
    expect(typeof createProduct).toBe('function');
  })

})