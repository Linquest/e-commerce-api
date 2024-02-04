import { prisma } from "../database/prisma";
import {
	CreateProductData,
	UpdateProductData,
} from "../entities/product.interface";

export class ProductService {
	async getMany(search: string, skip: number = 0, take: number = 20) {
		if (search) {
			const productList = await prisma.product.findMany({
				where: { title: { contains: search, mode: "insensitive" } },
				skip: skip,
				take: take,
			});
			return productList;
		} else {
			const productList = await prisma.product.findMany({
				skip: skip,
				take: take,
			});
			return productList;
		}
	}
	async getManyByCategory(category: string, skip: 0, take: 20) {
		const productList = await prisma.product.findMany({
			where: { category: category },
			skip: skip,
			take: take,
		});

		return productList;
	}

	async getOne(id: number) {
		const product = await prisma.product.findUnique({ where: { id } });

		if (!product) {
			throw new Error("Produto não encontrado");
		}

		return product;
	}

	async create(data: CreateProductData) {
		const product = await prisma.product.create({
			data: data,
		});

		return product;
	}

	async update(id: number, data: UpdateProductData) {
		const product = await prisma.product.findUnique({ where: { id } });

		if (!product) {
			throw new Error("Produto não encontrado");
		}

		const updatedProduct = await prisma.product.update({
			data: data,
			where: { id },
		});

		return updatedProduct;
	}

	async delete(id: number) {
		const product = await prisma.product.findUnique({ where: { id } });

		if (!product) {
			throw new Error("Produto não encontrado");
		}

		const deletedProduct = await prisma.product.delete({ where: { id } });

		return deletedProduct;
	}
}
