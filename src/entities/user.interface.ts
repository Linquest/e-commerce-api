import { PurchaseOrder } from "./purchaseOrder.interface";

export interface User {
	id: string;
	email: string;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	orders: PurchaseOrder[];
}

export type CreateUserData = Omit<User, "id" | "orders">;

export type UpdateUsertData = Partial<CreateUserData>;
