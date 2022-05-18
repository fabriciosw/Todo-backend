import { Request, Response } from 'express';
import UserRepository from 'src/database/repositories/UsersRepository';
import AppError from 'src/utils/AppError';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';

export default class UsersController {
    public async getUser(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);

        const { email } = request.body;

        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email inválido', 400);
        }

        return response.json(user);
    }

    public async createUser(request: Request, response: Response) {
        const { email, password } = request.body;

        const userRepository = getCustomRepository(UserRepository);

        const userExist = await userRepository.findByEmail(email);

        if (userExist) {
            throw new AppError('Já existe um usuário com este email', 418);
        }

        const senha = await bcrypt.hash(password, 12);
        const user = userRepository.create({ email, senha });

        await userRepository.save(user);

        return response.json(user);
    }
}
