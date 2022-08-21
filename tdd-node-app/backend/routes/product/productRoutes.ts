import { Router } from 'express';
import { getProduct } from '../../controller/product/productController.get';
import { createProduct } from '../../controller/product/productController.post';

const productRoutes = Router();

productRoutes.get('/', getProduct);

productRoutes.post('/', createProduct);

export { productRoutes };
