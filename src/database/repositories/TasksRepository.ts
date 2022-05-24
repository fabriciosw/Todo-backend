import { decode } from 'jsonwebtoken';
import AppError from 'src/utils/AppError';
import { EntityRepository, Repository } from 'typeorm';
import Task from '../entities/Task';

@EntityRepository(Task)
export default class TaskRepository extends Repository<Task> {
    public getUserOnPayload(authHeader: string | undefined) {
        if (!authHeader) {
            throw new AppError('JWT Token is missing.');
        }

        const [, token] = authHeader.split(' ');

        const payload = decode(token, {
            json: true,
        });

        if (!payload) {
            throw new AppError('JWT token invalid');
        }
        if (!payload.sub) {
            throw new AppError('JWT token invalid');
        }

        const user_id = parseInt(payload.sub);

        return user_id;
    }
}
