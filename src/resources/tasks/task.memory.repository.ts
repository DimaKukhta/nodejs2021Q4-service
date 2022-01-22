import { getRepository } from 'typeorm';
import { IUser } from '../users/user.interface';
import { ITask } from './task.interface';
import OrmTask from './task.model';

/**
 * Should return array of tasks where id of board === boardId
 * @returns array of tasks or emty array if tasks not exists
 */
 export const getAll = async () => {
  const allTasks = await getRepository(OrmTask).find();
  return allTasks;
}

/**
 * Should return task
 * @param taskId 
 * @returns task  of false if task not exist
 */
 export const getTask = async (taskId: ITask['id']) => {
  const task = await getRepository(OrmTask).findOne(taskId);
  return task;
}
/**
 * Should create task and push in array of tasks
 * @param task - data for new task
 * @returns new task
 */
 export const createTask = async (task: ITask) => {
  const newTask = await getRepository(OrmTask).insert(task);
  return newTask;
};

/**
 * Should update task
 * @param id - taskId
 * @param task - new data for task
 * @returns updated task or null if task not exist
 */
 export const updateTask = async (id: ITask['id'], task: ITask) => {
  const updatedTask = await getRepository(OrmTask).update(id, task);
  return updatedTask;
};

/**
 * Should delete task from array of tasks
 * @param id - task Id
 * @returns true - if task has been updated or false otherwise
 */
 export const deleteTask = async (id: ITask['id']) => {
  const task = await getRepository(OrmTask).delete(id);
  return task;
};

/**
 * Should delete tasks that belonged to a remote board
 * @param boardId - id of board
 */
 export const deleteBoardTasks = async (boardId: ITask['boardId']) => {
  await getRepository(OrmTask).delete({ boardId });
 }

/**
 * Should updated tasks where task.userId === userId, and set null value in the field
 * @param userId
 */
 export const updateDeleteUserTasks = async (userId: IUser['id']) => {
  const updatedTasks = await getRepository(OrmTask).update({ userId }, { userId: undefined });
  return updatedTasks;
 }

export default {
  getAll,
  getTask,
  createTask,
  deleteTask,
  updateTask,
  deleteBoardTasks,
  updateDeleteUserTasks,
};
