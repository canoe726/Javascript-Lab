import { Request, Response } from "express";
import { Product } from "../models/Product";

const productController = (req: Request, res: Response) => {
  res.send('안녕하세요!');
}

const createProduct = (req: Request, res: Response, next: any) => {
  const { body } = req;

  Product.create(body);
}

export { productController, createProduct };
