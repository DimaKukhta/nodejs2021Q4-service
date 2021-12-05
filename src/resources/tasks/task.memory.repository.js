const Task = require('./task.model');

const tasks = [];

const getAll = async () => tasks;

const getTask = async (id) => tasks.find((task) => task.id === id);

const createTask = async (title, order) => {
  const task = new Task({ title, order });
  tasks.push(task);
  return task;
};

const updateTask = async (id, task) => {
  let index = null;
  tasks.forEach((oldTask, i) => {
    if (oldTask.id === id) {
      index = i;
    }
  });
  if (index) {
    tasks[index] = { ...tasks[index], ...task };
    return tasks[index];
  }
  return null;
};

const deleteTask = async (id) => {
  let index = null;
  tasks.forEach((task, i) => {
    if (task.id === id) {
      index = i;
    }
  });

  tasks.slice(index, 1);
};

module.exports = { getAll, getTask, createTask, updateTask, deleteTask };
