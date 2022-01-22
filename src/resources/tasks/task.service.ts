/* eslint-disable no-return-await */
import OrmTask from './task.model';
import tasksRepo from './task.memory.repository';

/**
 * Should return array of tasks out of the call getAll function
 * @returns ITask[]
 */
const getTasksAllService = async (): Promise<object> =>
  await tasksRepo.getAll();

/**
 * Should return task by id out of the call getTask function
 * @param taskId - id of task
 * @returns ITask | undefined
 */
const getTaskIdService = async (taskId: string): Promise<object | undefined> =>
  await tasksRepo.getTask(taskId);

/**
 * Should add task out of the call createTask function
 * @param task - ITask
 * @returns void
 */
const addTaskService = async (task: OrmTask) => {
  await tasksRepo.createTask(task);
};

/**
 * Should update task out of the call updateTask function
 * @param taskId - id of task
 * @param updTask -new data for task
 * @returns void
 */
const updateTaskService = async (taskId: string, updTask: OrmTask) => {
  await tasksRepo.updateTask(taskId, updTask);
};

/**
 * Should delete task out of the call deleteTask function
 * @param taskId - id of task 
 * @returns void
 */
const deleteTaskService = async (taskId: string) => {
  await tasksRepo.deleteTask(taskId);
};

/**
 * Should delete task from board out of the call deleteBoardTasks function
 * @param boardId - id of board
 * @returns void
 */
const deleteTaskFromBoardService = async (boardId: string) => {
  await tasksRepo.deleteBoardTasks(boardId);
};

/**
 * Should set null value in user after delete task out of the call deleteBoardTasks function
 * @param userId - user id
 * @returns void
 */
const updateUserIdService = async (userId: string) => {
  await tasksRepo.updateDeleteUserTasks(userId);
};

export default {
  getTasksAllService,
  getTaskIdService,
  addTaskService,
  deleteTaskService,
  updateTaskService,
  deleteTaskFromBoardService,
  updateUserIdService,
};
