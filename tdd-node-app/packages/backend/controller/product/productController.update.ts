import { NextFunction, Request, Response } from "express";
import { Product } from "../../models/Product";

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true
    }
  );

  try {
    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send();
    }
  } catch (error) {
    next(error);
  }
};

export { updateProduct };
