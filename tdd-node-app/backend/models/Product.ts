// https://mongoosejs.com/docs/typescript.html
import { model, Schema } from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number
  }
});

const Product = model("Product", productSchema);

export { Product };
