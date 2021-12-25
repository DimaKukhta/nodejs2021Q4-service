import { IUser } from '../users/user.interface';
import { ITask } from './task.interface';

import * as tasksRepo from './task.memory.repository';

/**
 * Should return function from taskRepo to get all tasks, where task.boardId === boardId
 * @param boardId - id of board
 * @returns Function: () => Promise<ITask[]>
 */
export const getAll = (boardId: ITask['boardId']) => tasksRepo.getAll(boardId);

/**
 * Should return function from taskRepo to get task by id
 * @param boardId - id of board
 * @param taskId task id
 * @returns Function: () => Promise<ITask | undefined>
 */
export const getTask = (boardId: ITask['boardId'], taskId: ITask['id']) =>
  tasksRepo.getTask(boardId, taskId);

/**
 * Should return function from taskRepo to create task
 * @param task - data for new task
 * @returns Function: () => Promise<Task>
 */
export const createTask = (task: ITask) => tasksRepo.createTask(task);

/**
 * Should return function from taskRepo to update task
 * @param id - task id
 * @param task - new data for task
 * @returns Function: () => Promise<ITask | null>
 */
export const updateTask = (id: ITask['id'], task: ITask) =>
  tasksRepo.updateTask(id, task);

/**
 * Should return function from taskRepo to delete task
 * @param id - task Id
 * @returns Function: () => Promise<boolean>
 */
export const deleteTask = (id: ITask['id']) => tasksRepo.deleteTask(id);

/**
 * Should return function from taskRepo to delete tasks where boardId === boardId
 * @param boardId - board id
 * @returns Function: () => Promise<void>
 */
export const deleteBoardTasks = (boardId: ITask['boardId']) =>
  tasksRepo.deleteBoardTasks(boardId);

/**
 * Should return function from taskRepo to update userId from id to null
 * @param userId - user id
 * @returns Function: () => Promise<void>
 */
export const updateDeleteUserTasks = (userId: IUser['id']) =>
  tasksRepo.updateDeleteUserTasks(userId);
