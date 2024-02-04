import { prisma } from "../database/prisma";
import {
	CreatePurchaseOrderItems,
	UpdatePurchaseOrderItems,
} from "../entities/purchaseOrderItems.interface";

export class PurchaseOrderItemsService {
	async getMany(skip: number = 0, take: number = 20) {
		const orderItemList = await prisma.purchaseOrderItems.findMany({
			skip: skip,
			take: take,
		});

		return orderItemList;
	}

	async getOne(id: number) {
		const orderItem = await prisma.purchaseOrderItems.findUnique({
			where: { id },
		});

		if (!orderItem) {
			throw new Error("Item do pedido não encontrado");
		}

		return orderItem;
	}

	async create(data: CreatePurchaseOrderItems) {
		const product = await prisma.product.findUnique({
			where: { id: Number(data.productId) },
		});

		if (!product) {
			throw new Error("Produto não encontrado");
		}

		const orderItem = await prisma.purchaseOrderItems.create({
			data: {
				quantity: data.quantity,
				price: product.price,
				products: {
					connect: { id: Number(data.productId) },
				},
				purchaseOrders: {
					connect: { id: Number(data.purchaseOrderId) },
				},
			},
		});

		return orderItem;
	}

	async delete(id: number) {
		const orderItem = await prisma.purchaseOrderItems.findUnique({
			where: { id },
		});

		if (!orderItem) {
			throw new Error("Item do pedido não encontrado");
		}

		const deletedOrderItem = await prisma.purchaseOrderItems.delete({
			where: { id },
		});

		return deletedOrderItem;
	}
}
