import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
	async getMany(req: Request, res: Response) {
		const userService = new UserService();

		const response = await userService.getMany("", 0, 20);

		return res.status(200).json(response);
	}

	async create(req: Request, res: Response) {
		const userService = new UserService();

		const response = await userService.create(req.body);

		return res.status(201).json(response);
	}

	async getOne(req: Request, res: Response) {
		const userService = new UserService();

		const id = Number(req.params.id);

		const response = await userService.getOne(id);

		return res.status(200).json(response);
	}

	async update(req: Request, res: Response) {
		try {
			const id = Number(req.params.id);
			const userService = new UserService();
			const user = await userService.getOne(id);

			if (!user) {
				return res.status(404).json({ message: "Usuário não encontrado" });
			}

			const updatedUser = await userService.update(id, req.body);
			return res.status(200).json(updatedUser);
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
			const userService = new UserService();
			const user = await userService.getOne(id);

			if (!user) {
				return res.status(404).json({ message: "Usuário não encontrado" });
			}

			await userService.delete(id);
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
