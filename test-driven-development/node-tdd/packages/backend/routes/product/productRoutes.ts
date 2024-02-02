import { Router } from "express";
import { getProductById, getProducts } from "../../controller/product/productController.get";
import { createProduct } from "../../controller/product/productController.post";

const productRoutes = Router();

productRoutes.get("/", getProducts);
productRoutes.get("/:productId", getProductById);

productRoutes.post("/", createProduct);

export { productRoutes };
