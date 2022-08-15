import router from "express";
import { productRoutes } from "./product/productRoutes";

/**
 * @swagger
 * tags:
 *  name: Product
 *  description: 제품 정보 테스트
 */
router().use('/product', productRoutes)

export { router };
