import { Router } from 'express';
import TasksController from '../../controllers/TasksController';
import { celebrate, Joi, Segments } from 'celebrate';

const tasksRouter = Router();
const TaskController = new TasksController();

tasksRouter.get('/', TaskController.getAll);

tasksRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            description: Joi.string().required(),
        },
    }),
    TaskController.create,
);

tasksRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    TaskController.endTask,
);

tasksRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    TaskController.delete,
);

export default tasksRouter;
