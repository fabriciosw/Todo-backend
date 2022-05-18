import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from 'src/utils/AppError';
import authConfig from '@config/auth';

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT Token is missing.');
    }
    // Bearer sdlkfjsldkfjlsjfffdklfjdflksjflkjfdlk3405905
    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);

        return next();
    } catch {
        throw new AppError('Invalid JWT Token.');
    }
}
