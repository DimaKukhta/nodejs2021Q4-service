import { getRepository } from 'typeorm';
import { IUser } from '../users/user.interface';
import { ITask } from './task.interface';

import Task from './task.model';

// const tasks: Array<ITask> = [];

/**
 * Should return array of tasks where id of board === boardId
 * @param boardId - Id of board
 * @returns array of tasks or emty array if tasks not exists
 */
export const getAll = async (boardId: ITask['boardId']) => {
  const allTasks = await getRepository(Task).find();
  return allTasks;
}

/**
 * Should return task
 * @param boardId
 * @param taskId 
 * @returns task  of false if task not exist
 */
export const getTask = async (boardId: ITask['boardId'], taskId: ITask['id']) => {
  const task = await getRepository(Task).findOne(taskId);
  return task;
}

/**
 * Should create task and push in array of tasks
 * @param task - data for new task
 * @returns new task
 */
export const createTask = async (task: ITask) => {
  const newTask = await getRepository(Task).insert(task);
  return newTask;
};

/**
 * Should update task
 * @param id - taskId
 * @param task - new data for task
 * @returns updated task or null if task not exist
 */
export const updateTask = async (id: ITask['id'], task: ITask) => {
  const updatedTask = await getRepository(Task).update(id, task);
  return updatedTask;
};

/**
 * Should delete task from array of tasks
 * @param id - task Id
 * @returns true - if task has been updated or false otherwise
 */
export const deleteTask = async (id: ITask['id']) => {
  const task = await getRepository(Task).delete(id);
  return task;
};

/**
 * Should delete tasks that belonged to a remote board
 * @param boardId - id of board
 */
export const deleteBoardTasks = async (boardId: ITask['boardId']) => {
  const tasks = await getRepository(Task).delete({ boardId });
  return tasks;
};

/**
 * Should updated tasks where task.userId === userId, and set null value in the field
 * @param userId
 */
export const updateDeleteUserTasks = async (userId: IUser['id']) => {
  const updatedTasks = getRepository(Task).update({ userId }, { userId: undefined });
  return updatedTasks;
};
