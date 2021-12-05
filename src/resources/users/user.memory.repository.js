const User = require('./user.model');

const users = [];

const getAll = async () => users;

const getUser = async (id) => users.find((user) => user.id === id);

const createUser = async (name, login, password) => {
  const user = new User({ name, login, password });
  users.push(user);
  return user;
};

const updateUser = async (id, user) => {
  let index = null;
  users.forEach((oldUser, i) => {
    if (oldUser.id === id) {
      index = i;
    }
  });
  if (index) {
    users[index] = { ...users[index], ...user };
    return users[index];
  }
  return null;
};

const deleteUser = async (id) => {
  let index = null;
  users.forEach((user, i) => {
    if (user.id === id) {
      index = i;
    }
  });

  users.slice(index, 1);
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
