import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import UsersController from 'src/controllers/UsersController';

const usersRouter = Router();
const UserController = new UsersController();

usersRouter.get(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required(),
        },
    }),
    UserController.getUser,
);

usersRouter.post(
    '/create',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    UserController.createUser,
);

export default usersRouter;
