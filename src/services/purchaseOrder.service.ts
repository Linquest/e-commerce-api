import { prisma } from "../database/prisma";
import {
	CreatePurchaseOrder,
	UpdatePurchaseOrder,
} from "../entities/purchaseOrder.interface";

export class PurchaseOrderService {
	async getMany(skip: number = 0, take: number = 20) {
		const orderList = await prisma.purchaseOrder.findMany({
			skip: skip,
			take: take,
			include: { items: { include: { products: true } } },
		});

		const orderWithProducts = orderList.map((order) => {
			return {
				id: order.id,
				userId: order.userId,
				date: order.date,
				products: order?.items.map((item) => ({
					...item.products,
					quantity: item.quantity,
				})),
			};
		})
		
		return orderWithProducts;
	}

	async getOne(id: number) {
		const order = await prisma.purchaseOrder.findUnique({
			where: { id },
			include: { items: { include: { products: true } } },
		});
		const orderWithProducts = {
			...order,
			products: order?.items.map((item) => ({
				...item.products,
				quantity: item.quantity,
			})),
		};

		delete orderWithProducts?.items;

		if (!order) {
			throw new Error("Pedido não encontrado");
		}

		return orderWithProducts;
	}

	async create(data: CreatePurchaseOrder) {
		const order = await prisma.purchaseOrder.create({
			data: {
				user: { connect: { id: data.userId } },
			},
		});

		return order;
	}

	async delete(id: number) {
		const order = await prisma.purchaseOrder.findUnique({ where: { id } });

		if (!order) {
			throw new Error("Pedido não encontrado");
		}

		const deletedOrder = await prisma.purchaseOrder.delete({ where: { id } });

		return deletedOrder;
	}
}
