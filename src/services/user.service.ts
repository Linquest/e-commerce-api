import { prisma } from "../database/prisma";
import { CreateUserData } from "../entities/user.interface";

export class UserService {
	async getMany(search: string, skip: number = 0, take: number = 20) {
		if (search) {
			const userList = await prisma.user.findMany({
				where: { username: { contains: search, mode: "insensitive" } },
				skip: skip,
				take: take,
			});
			return userList;
		} else {
			const userList = await prisma.user.findMany({
				skip: skip,
				take: take,
			});
			return userList;
		}
	}

	async getOne(id: number) {
		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				orders: { include: { items: { include: { products: true } } } },
			},
		});
		const userWithProducts = {
			...user,
			products: user?.orders?.map((order) =>
				order.items.map((item) => item.products)
			),
		};
		delete userWithProducts?.orders;
		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		return userWithProducts;
	}

	async create(data: CreateUserData) {
		const user = await prisma.user.create({
			data: data,
		});
		return user;
	}

	async update(id: number, data: CreateUserData) {
		const user = await prisma.user.findUnique({ where: { id } });

		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		const updatedUser = await prisma.user.update({
			data: data,
			where: { id },
		});

		return updatedUser;
	}

	async delete(id: number) {
		const user = await prisma.user.findUnique({ where: { id } });

		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		const deletedUser = await prisma.user.delete({
			where: { id },
		});

		const deletedProduct = await prisma.product.delete({
			where: { id },
		});

		return deletedUser;
	}
}
