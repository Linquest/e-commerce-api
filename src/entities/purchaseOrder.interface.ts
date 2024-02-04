import { PurchaseOrderItems } from "./purchaseOrderItems.interface";
import { User } from "./user.interface";

export interface PurchaseOrder {
	id: string;
	user: User;
	userId: number;
	date: Date;
	items: PurchaseOrderItems[];
}

export type CreatePurchaseOrder = Omit<PurchaseOrder, "id" | "items"> & {
	userId: string;
};

export type UpdatePurchaseOrder = Partial<CreatePurchaseOrder>;
