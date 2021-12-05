const tasksRepo = require('./task.memory.repository');

const getAll = () => tasksRepo.getAll();

const getTask = (id) => tasksRepo.getTask(id);

const createTask = (title, order) => tasksRepo.createTask(title, order);

const updateTask = (id, task) => tasksRepo.updateTask(id, task);

const deleteTask = (id) => tasksRepo.deleteTask(id);

module.exports = { getAll, getTask, createTask, updateTask, deleteTask };
