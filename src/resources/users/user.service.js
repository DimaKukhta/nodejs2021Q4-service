const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = (id) => usersRepo.getUser(id);

const createUser = (user) => usersRepo.createUser(user);

const updateUser = (id, user) => usersRepo.updateUser(id, user);

const deleteUser = async (id) => {
    await tasksService.updateDeleteUserTasks(id);
    return usersRepo.deleteUser(id)
}

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
