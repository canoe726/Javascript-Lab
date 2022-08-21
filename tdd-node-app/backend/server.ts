import express from "express";
import mongoose from 'mongoose';
import { productRoutes } from './routes/product/productRoutes';
import { MONGOOSE_URI_OF_PRODUCTS } from "./shared/constants/auth.config.const";
import { specs, swaggerUi } from "./swagger/swagger";

const PORT = 3000;
// const HOST = "0.0.0.0";

mongoose.connect(MONGOOSE_URI_OF_PRODUCTS,  {
}).then(() => {
  console.log('MongoDB connected...')
}).catch((error) => console.error(`MongoDB Connection error occured : ${error}`));

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api/products', productRoutes);

app.listen(PORT);
console.log(`Running on ${PORT}`);

export { app };

