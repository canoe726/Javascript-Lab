import { Request, Response } from "express";

const productController = (req: Request, res: Response) => {
  res.send('안녕하세요!');
}

const createProduct = () => {
  
}

export { productController, createProduct };
