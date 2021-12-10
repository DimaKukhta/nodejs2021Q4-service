const User = require('./user.model');

const users = [];

const getAll = async () => users;

const getUser = async (id) => users.find((user) => user.id === id);

const createUser = async (newUser) => {
  const user = new User(newUser);
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
  if (index !== null) {
    users[index] = { ...users[index], ...user };
    return users[index];
  }
  return false;
};

const deleteUser = async (id) => {
  let index = null;
  users.forEach((user, i) => {
    if (user.id === id) {
      index = i;
    }
  });
  users.splice(index, 1);
  return index !== null;
};

module.exports = { getAll, getUser, createUser, updateUser, deleteUser };
