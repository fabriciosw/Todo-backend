import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from 'src/utils/AppError';
import CreateSessionsService from '../services/CreateSession';
import authConfig from 'src/config/auth';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;

        const createSession = new CreateSessionsService();

        const token = await createSession.execute({
            email,
            password,
        });

        return response.json(token);
    }

    public async verify(request: Request, response: Response) {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new AppError('JWT Token is missing.');
        }

        const [, token] = authHeader.split(' ');

        try {
            const decodedToken = verify(token, authConfig.jwt.secret);

            return response.json(true);
        } catch (error) {
            return response.json(false);
        }
    }
}
