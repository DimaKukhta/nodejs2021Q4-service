import { FastifyRequest, FastifyReply } from 'fastify';
import taskService from '../task.service';
import OrmTask from '../task.model';
import { ITask } from '../task.interface';

type FastifyRequestTask = FastifyRequest<{
  Body: ITask;
  Params: {
    taskId: string;
    boardId: string;
  };
}>;

const getTasksAllRouter = async (_: FastifyRequest, reply: FastifyReply) => {
  const tasks = await taskService.getTasksAllService();
  reply.code(200).send(tasks);
};

const getTaskIdRouter = async (
  request: FastifyRequestTask,
  reply: FastifyReply
) => {
  const { taskId } = request.params;

  if (await taskService.getTaskIdService(taskId)) {
    const task = await taskService.getTaskIdService(taskId);
    reply.code(200).send(task);
  } else {
    reply.code(404).send();
  }
};

const addTaskRouter = async (
  request: FastifyRequestTask,
  reply: FastifyReply
) => {
  const { boardId } = request.params;
  request.body.boardId = boardId;

  const task: OrmTask = new OrmTask();
  task.title = request.body.title;
  task.order = request.body.order;
  task.description = request.body.description;
  task.userId = request.body.userId;
  task.boardId = request.body.boardId;
  task.columnId = request.body.columnId;
  await taskService.addTaskService(task);
  reply.code(201).send(task);
};

const updateTaskRouter = async (
  request: FastifyRequestTask,
  reply: FastifyReply
) => {
  const { taskId } = request.params;

  if (await taskService.getTaskIdService(taskId)) {
    const updTask: OrmTask = new OrmTask();
    updTask.id = taskId;
    updTask.title = request.body.title;
    updTask.order = request.body.order;
    updTask.description = request.body.description;
    updTask.userId = request.body.userId;
    updTask.boardId = request.body.boardId;
    updTask.columnId = request.body.columnId;
    await taskService.updateTaskService(taskId, updTask);
    reply.code(200).send(updTask);
  } else {
    reply.code(404).send();
  }
};

const deleteTaskRouter = async (
  request: FastifyRequestTask,
  reply: FastifyReply
) => {
  const { taskId } = request.params;

  if (await taskService.getTaskIdService(taskId)) {
    await taskService.deleteTaskService(taskId);
    reply.code(204);
  } else {
    reply.code(404).send();
  }
};

export default {
  getTasksAllRouter,
  getTaskIdRouter,
  addTaskRouter,
  deleteTaskRouter,
  updateTaskRouter,
};
