import { IUser } from '../users/user.interface';
import { ITask } from './task.interface';

const tasksRepo = require('./task.memory.repository');

export const getAll = (boardId: ITask['boardId']) => tasksRepo.getAll(boardId);

export const getTask = (boardId: ITask['boardId'], taskId: ITask['id']) =>
  tasksRepo.getTask(boardId, taskId);

export const createTask = (task: ITask) => tasksRepo.createTask(task);

export const updateTask = (id: ITask['id'], task: ITask) =>
  tasksRepo.updateTask(id, task);

export const deleteTask = (id: ITask['id']) => tasksRepo.deleteTask(id);

export const deleteBoardTasks = (boardId: ITask['boardId']) =>
  tasksRepo.deleteBoardTasks(boardId);

export const updateDeleteUserTasks = (userId: IUser['id']) =>
  tasksRepo.updateDeleteUserTasks(userId);
