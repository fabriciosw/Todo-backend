import AppError from '../utils/AppError';

import bcrypt from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../database/repositories/UsersRepository';

export async function CreateUserService(email: string, password: string) {
    const userRepository = getCustomRepository(UserRepository);
    const userExist = await userRepository.findByEmail(email);

    if (userExist) {
        throw new AppError('Já existe um usuário com este email', 418);
    }

    const senha = await bcrypt.hash(password, 12);
    const user = userRepository.create({ email, senha });

    await userRepository.save(user);

    const response = {
        email: user.email,
        id: user.id,
    };
    return response;
}
