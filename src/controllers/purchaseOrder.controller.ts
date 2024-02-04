import { Request, Response } from "express";
import { PurchaseOrderService } from "../services/purchaseOrder.service";

const purchaseOrderService = new PurchaseOrderService();

export class PurchaseOrderController {
	async getMany(req: Request, res: Response) {
		try {
			const response = await purchaseOrderService.getMany();
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
			const order = await purchaseOrderService.getOne(id);
			return res.status(200).json(order);
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
		try {
			const newOrder = await purchaseOrderService.create(req.body);
			res.json(newOrder);
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

	async delete(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			await purchaseOrderService.delete(id);
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
