import { ITask } from './task.interface';

import Task from './task.model';

const tasks: Array<ITask> = [];

export const getAll = async (boardId: ITask['boardId']) =>
  tasks.filter((task) => task.boardId === boardId);

export const getTask = async (boardId: ITask['boardId'], taskId: ITask['id']) =>
  tasks.find((task) => task.id === taskId && task.boardId === boardId);

export const createTask = async (task: ITask) => {
  const newTask = new Task(task);
  tasks.push(newTask);
  return newTask;
};

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

export const deleteBoardTasks = async (boardId: ITask['boardId']) => {
  const boardTasks = tasks.filter((task) => task.boardId === boardId);
  boardTasks.forEach((task) => {
    deleteTask(task.id);
  });
};

export const updateDeleteUserTasks = async (userId: ITask['userId']) => {
  const userTasks = tasks.filter((task) => task.userId === userId);
  userTasks.forEach((task) => {
    updateTask(task.id, { ...task, userId: null });
  });
};
