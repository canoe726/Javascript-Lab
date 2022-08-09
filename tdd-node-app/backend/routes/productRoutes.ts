import { Router } from 'express';
import { productController } from '../controller/productController';

const productRoutes = Router();

productRoutes.get('/', productController);

export { productRoutes };
