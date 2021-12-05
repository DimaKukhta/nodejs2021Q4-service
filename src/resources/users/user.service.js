const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = (id) => usersRepo.getUser(id);

const createUser = (name, login, password) => usersRepo.createUser(name, login, password);

const updateUser = (id, user) => usersRepo.updateUser(id, user);

const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
