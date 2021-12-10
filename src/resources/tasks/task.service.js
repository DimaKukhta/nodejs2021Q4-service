const tasksRepo = require('./task.memory.repository');

const getAll = (taskId) => tasksRepo.getAll(taskId);

const getTask = (boardId, taskId) => tasksRepo.getTask(boardId, taskId);

const createTask = (task) => tasksRepo.createTask(task);

const updateTask = (id, task) => tasksRepo.updateTask(id, task);

const deleteTask = (id) => tasksRepo.deleteTask(id);

const deleteBoardTasks = (boardId) => tasksRepo.deleteBoardTasks(boardId);

const updateDeleteUserTasks = (userId) => tasksRepo.updateDeleteUserTasks(userId);

module.exports = { getAll, getTask, createTask, updateTask, deleteTask, deleteBoardTasks, updateDeleteUserTasks };
