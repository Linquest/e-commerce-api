import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

const productService = new ProductService();

export class ProductController {
	async getMany(req: Request, res: Response) {
		const response = await productService.getMany("", 0, 20);

		return res.status(200).json(response);
	}

	async getManyByCategory(req: Request, res: Response) {
		const categoryId = req.params.categoryId;

		const response = await productService.getManyByCategory(categoryId, 0, 20);

		return res.status(200).json(response);
	}

	async getOne(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);

			const product = await productService.getOne(id);

			if (!product) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			return res.status(200).json(product);
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
		const response = productService.create(req.body);

		return res.status(201).json(response);
	}

	async update(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);

			const product = await productService.getOne(id);

			if (!product) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			const updatedProduct = await productService.update(id, req.body);
			return res.status(200).json(updatedProduct);
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

			const product = await productService.getOne(id);

			if (!product) {
				return res.status(404).json({ message: "Produto não encontrado" });
			}

			await productService.delete(id);
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
