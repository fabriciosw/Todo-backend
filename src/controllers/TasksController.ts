import AppError from 'src/utils/AppError';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TaskRepository from '../database/repositories/TasksRepository';

export default class TasksController {
    public async getAll(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user = request.headers.user;
        const taskRepository = getCustomRepository(TaskRepository);

        try {
            const products = await taskRepository.find({
                where: { user_id: user },
            });
            return response.json(products);
        } catch (error) {
            return response.json(error);
        }
    }

    public async endTask(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const tasksRepository = getCustomRepository(TaskRepository);

        const task = await tasksRepository.findOne(id);

        if (!task) {
            throw new AppError('Task not found.');
        }

        await tasksRepository.update(task.id, { complete: true });

        return response.json('completada');
    }

    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { title, description, user_id } = request.body;
        const complete = false;
        const tasksRepository = getCustomRepository(TaskRepository);

        const task = tasksRepository.create({
            title,
            description,
            complete,
            user_id,
        });
        console.log(task);
        await tasksRepository.save(task);

        return response.json(task);
    }

    public async delete(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;

        const tasksRepository = getCustomRepository(TaskRepository);

        const task = await tasksRepository.findOne(id);

        if (!task) {
            throw new AppError('Task not found.');
        }

        await tasksRepository.remove(task);

        return response.json([]);
    }
}
