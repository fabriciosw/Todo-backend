import { EntityRepository, Repository } from 'typeorm';
import Task from '../entities/Task';

@EntityRepository(Task)
export default class TaskRepository extends Repository<Task> {}
