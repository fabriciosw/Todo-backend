import { Router } from 'express';
import tasksRouter from 'src/routes/v1/tasks.routes';
import usersRouter from 'src/routes/v1/users.routes';
import sessionsRouter from 'src/routes/v1/sessions.routes';

const routes = Router();

routes.use('/tasks', tasksRouter);
routes.use('/user', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
