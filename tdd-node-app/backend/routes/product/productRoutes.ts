import { Router } from "express";
import { getProducts } from "../../controller/product/productController.get";
import { createProduct } from "../../controller/product/productController.post";

const productRoutes = Router();

productRoutes.get("/", getProducts);

productRoutes.post("/", createProduct);

export { productRoutes };
