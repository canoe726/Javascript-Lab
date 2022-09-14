import { NextFunction, Request, Response } from "express";
import { Product } from "../../models/Product";

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const createdProduct = await Product.create(body);

    res.status(201).json(createdProduct);
  } catch (error: any) {
    next(error);
  }
};

export { createProduct };
