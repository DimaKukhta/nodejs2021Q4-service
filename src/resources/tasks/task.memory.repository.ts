import { IUser } from '../users/user.interface';
import { ITask } from './task.interface';

import Task from './task.model';

const tasks: Array<ITask> = [];

/**
 * Should return array of tasks where id of board === boardId
 * @param boardId - Id of board
 * @returns array of tasks or emty array if tasks not exists
 */
export const getAll = async (boardId: ITask['boardId']) =>
  tasks.filter((task) => task.boardId === boardId);

/**
 * Should return task
 * @param boardId
 * @param taskId 
 * @returns task  of false if task not exist
 */
export const getTask = async (boardId: ITask['boardId'], taskId: ITask['id']) =>
  tasks.find((task) => task.id === taskId && task.boardId === boardId);

/**
 * Should create task and push in array of tasks
 * @param task - data for new task
 * @returns new task
 */
export const createTask = async (task: ITask) => {
  const newTask = new Task(task);
  tasks.push(newTask);
  return newTask;
};

/**
 * Should update task
 * @param id - taskId
 * @param task - new data for task
 * @returns updated task or null if task not exist
 */
export const updateTask = async (id: ITask['id'], task: ITask) => {
  let index = null;
  tasks.forEach((oldTask, i) => {
    if (oldTask.id === id) {
      index = i;
    }
  });
  if (index !== null) {
    tasks[index] = { ...tasks[index], ...task };
    return tasks[index];
  }
  return null;
};

/**
 * Should delete task from array of tasks
 * @param id - task Id
 * @returns true - if task has been updated or false otherwise
 */
export const deleteTask = async (id: ITask['id']) => {
  let index = -1;
  tasks.forEach((task, i) => {
    if (task.id === id) {
      index = i;
    }
  });
  if (index !== -1) {
    tasks.splice(index, 1);
  }
  return index !== -1;
};

/**
 * Should delete tasks that belonged to a remote board
 * @param boardId - id of board
 */
export const deleteBoardTasks = async (boardId: ITask['boardId']) => {
  const boardTasks = tasks.filter((task) => task.boardId === boardId);
  boardTasks.forEach((task) => {
    deleteTask(task.id);
  });
};

/**
 * Should updated tasks where task.userId === userId, and set null value in the field
 * @param userId
 */
export const updateDeleteUserTasks = async (userId: IUser['id']) => {
  const userTasks = tasks.filter((task) => task.userId === userId);
  userTasks.forEach((task) => {
    updateTask(task.id, { ...task, userId: null });
  });
};
