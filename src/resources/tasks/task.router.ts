import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ITask } from './task.interface';

import * as tasksService from './task.service';

interface IParams {
  taskId?: string,
  boardId: string
}

const taskRouter = (
  fastify: FastifyInstance,
  option: FastifyPluginOptions,
  done: () => void
) => {
  /**
   * Should get all tasks and sent them
   */
  fastify.get<{ Params: IParams }>('/boards/:boardId/tasks', async (req) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);
    return tasks;
  });

  /**
   * Should get a task by id and send it
   */
  fastify.get<{ Params: IParams }>('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getTask(boardId, taskId);
    if (task) {
      return task;
    }
    reply.code(404);
    return { message: 'Task not found' };
  });

  /**
   * Should create a new task and send it
   */
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

  /**
   * Should update a task and send it
   */
  fastify.put<{ Params: IParams, Body: ITask }>('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const { taskId } = req.params;
    const updatedTask = await tasksService.updateTask(taskId, req.body);
    if (updatedTask) {
      return updatedTask;
    }
    reply.code(400);
    return { message: 'Bad request' };
  });

  /**
   * Should delete a task by id
   */
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
