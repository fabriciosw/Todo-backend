import { Router } from 'express';
import tasksRouter from 'src/routes/v1/tasks.routes';

const routes = Router();

routes.use('/tasks', tasksRouter);

export default routes;
