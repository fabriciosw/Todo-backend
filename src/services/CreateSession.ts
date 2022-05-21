import AppError from 'src/utils/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import UsersRepository from 'src/database/repositories/UsersRepository';
import authConfig from 'src/config/auth';

interface IRequest {
    email: string;
    password: string;
}

class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<string> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordConfirmed = await compare(password, user.senha);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: `${user.id}`,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return token;
    }
}

export default CreateSessionsService;
