import { Request, Response } from "express";
import { PurchaseOrderItemsService } from "../services/purchaseOrderItems.service";

const purchaseOrderItemsService = new PurchaseOrderItemsService();

export class PurchaseOrderItemsController {
	async getMany(req: Request, res: Response) {
		try {
			const response = await purchaseOrderItemsService.getMany();
			return res.status(200).json(response);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(500).json({ message: error.message });
			} else {
				return res
					.status(500)
					.json({ message: "Ocorreu um erro desconhecido" });
			}
		}
	}

	async getOne(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const orderItem = await purchaseOrderItemsService.getOne(id);
			return res.status(200).json(orderItem);
		} catch (error) {
			if (error instanceof Error) {
				return res.status(500).json({ message: error.message });
			} else {
				return res
					.status(500)
					.json({ message: "Ocorreu um erro desconhecido" });
			}
		}
	}

	async create(req: Request, res: Response) {
		const newOrderItem = await purchaseOrderItemsService.create(req.body);
		res.json(newOrderItem);
	}

	async delete(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			await purchaseOrderItemsService.delete(id);
			return res.status(204).send();
		} catch (error) {
			if (error instanceof Error) {
				return res.status(500).json({ message: error.message });
			} else {
				return res
					.status(500)
					.json({ message: "Ocorreu um erro desconhecido" });
			}
		}
	}
}
