import { NextFunction, Request, Response } from "express";
import { Product } from "../../models/Product";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allProducts = await Product.find({});
    res.status(200).json(allProducts);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  const product = await Product.findById(req.params.productId);

  try {
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

export { getProducts, getProductById };
