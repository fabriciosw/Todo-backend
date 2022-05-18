import { Router } from 'express';
import TasksController from '../../controllers/TasksController';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from 'src/middlewares/UserAuthenticated';

const tasksRouter = Router();
const TaskController = new TasksController();

tasksRouter.get('/', isAuthenticated, TaskController.getAll);

tasksRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            description: Joi.string().required(),
            user_id: Joi.number().required(),
        },
    }),
    TaskController.create,
);

tasksRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    TaskController.endTask,
);

tasksRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().required(),
        },
    }),
    TaskController.delete,
);

export default tasksRouter;
