import { NextFunction, Request, Response } from "express";
import { Product } from "../../models/Product";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const allProducts = await Product.find({});
  res.status(200).json(allProducts);
};

export { getProducts };
