import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ITask } from './task.interface';

const tasksService = require('./task.service');

interface IParams {
  taskId?: string,
  boardId: string
}

const taskRouter = (
  fastify: FastifyInstance,
  option: FastifyPluginOptions,
  done: () => void
) => {
  fastify.get<{ Params: IParams }>('/boards/:boardId/tasks', async (req) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);
    return tasks;
  });

  fastify.get<{ Params: IParams }>('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getTask(boardId, taskId);
    if (task) {
      return task;
    }
    reply.code(404);
    return { message: 'Task not found' };
  });

  fastify.post<{ Params: IParams, Body: ITask }>('/boards/:boardId/tasks', async (req, reply) => {
    const { boardId } = req.params;
    const newTask = await tasksService.createTask({ ...req.body, boardId });
    if (newTask) {
      reply.code(201);
      return newTask;
    }
    reply.code(400);
    return { message: 'Bad request' };
  });

  fastify.put<{ Params: IParams }>('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const { taskId } = req.params;
    const updatedTask = await tasksService.updateTask(taskId, req.body);
    if (updatedTask) {
      return updatedTask;
    }
    reply.code(400);
    return { message: 'Bad request' };
  });

  fastify.delete<{ Params: IParams }>('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const { taskId } = req.params;
    const result = await tasksService.deleteTask(taskId);
    if (result) {
      reply.code(204);
      return;
    }
    reply.code(404);
  });
  done();
};

export default taskRouter;
