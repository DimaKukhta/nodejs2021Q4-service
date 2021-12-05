const Task = require('./task.model');

const tasks = [];

const getAll = async (boardId) =>
  tasks.filter((task) => task.boardId === boardId);

const getTask = async (boardId, taskId) =>
  tasks.find((task) => task.id === taskId && task.boardId === boardId);

const createTask = async (task) => {
  const newTask = new Task(task);
  tasks.push(newTask);
  return newTask;
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
  if (index) {
    tasks.slice(index, 1);
    return true;
  } 
    return false;
  
};

module.exports = { getAll, getTask, createTask, updateTask, deleteTask };
