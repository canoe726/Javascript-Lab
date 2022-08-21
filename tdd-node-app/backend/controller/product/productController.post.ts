import { Request, Response } from "express";
import { Product } from "../../models/Product";

const createProduct = async (req: Request, res: Response, next: any) => {
  try {
    const { body } = req;
    const createdProduct = await Product.create(body);

    res.status(201).json(createdProduct);
  } catch (error: unknown) {
    next(error);
  }
};

export { createProduct };
