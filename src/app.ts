import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import {productRoutes, purchaseOrderItemsRoutes, purchaseOrderRoutes, userRoutes} from "./routes/product.routes";

export const app = express();

app.use(helmet());
app.use(json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/purchaseOrder", purchaseOrderRoutes);
app.use("/purchaseOrderItems", purchaseOrderItemsRoutes);
