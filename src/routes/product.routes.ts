import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { UserController } from "../controllers/user.controller";
import { PurchaseOrderController } from "../controllers/purchaseOrder.controller";
import { PurchaseOrderItemsController } from "../controllers/purchaseOrderItems.controller";

export const productRoutes = Router();
export const userRoutes = Router();
export const purchaseOrderRoutes = Router();
export const purchaseOrderItemsRoutes = Router();

const productController = new ProductController();
const userController = new UserController();
const purchaseOrder = new PurchaseOrderController();
const purchaseOrderItems = new PurchaseOrderItemsController();

productRoutes.get("/", productController.getMany);
productRoutes.get("/category/:categoryId", productController.getManyByCategory);
productRoutes.get("/:id", productController.getOne);
productRoutes.post("/", productController.create);
productRoutes.put("/:id", productController.update);
productRoutes.delete("/:id", productController.delete);

userRoutes.get("/", userController.getMany);
userRoutes.get("/:id", userController.getOne);
userRoutes.post("/", userController.create);
userRoutes.put("/:id", userController.update);
userRoutes.delete("/:id", userController.delete);

purchaseOrderRoutes.get("/", purchaseOrder.getMany);
purchaseOrderRoutes.get("/:id", purchaseOrder.getOne);
purchaseOrderRoutes.post("/", purchaseOrder.create);
purchaseOrderRoutes.delete("/:id", purchaseOrder.delete);

purchaseOrderItemsRoutes.get("/", purchaseOrderItems.getMany);
purchaseOrderItemsRoutes.get("/:id", purchaseOrderItems.getOne);
purchaseOrderItemsRoutes.post("/", purchaseOrderItems.create);
purchaseOrderItemsRoutes.delete("/:id", purchaseOrderItems.delete);
