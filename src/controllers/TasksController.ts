import AppError from 'src/utils/AppError';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TaskRepository from '../database/repositories/TasksRepository';

export default class TasksController {
    public async getAll(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const taskRepository = getCustomRepository(TaskRepository);

        const products = await taskRepository.find();

        return response.json(products);
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
        const { title, description } = request.body;

        const tasksRepository = getCustomRepository(TaskRepository);

        const task = tasksRepository.create({
            title,
            description,
        });

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
