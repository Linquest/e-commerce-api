import { Product } from "./product.interface";
import { PurchaseOrder } from "./purchaseOrder.interface";

export interface PurchaseOrderItems {
	id: string;
	products: Product;
	productId: number;
	purchaseOrders: PurchaseOrder;
	purchaseOrderId: number;
	quantity: number;
	price: number;
}

export type CreatePurchaseOrderItems = Omit<PurchaseOrderItems, "id"> | Omit<PurchaseOrderItems, "id" | "products" | "purchaseOrders">

export type UpdatePurchaseOrderItems = Omit<PurchaseOrderItems, "id" | "products" | "purchaseOrders">