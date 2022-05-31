import { Request, Response } from 'express';
import UserRepository from 'src/database/repositories/UsersRepository';
import AppError from 'src/utils/AppError';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { CreateUserService } from 'src/services/user.service';

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
        const user = await CreateUserService(email, password);
        return response.json(user);
    }
}
