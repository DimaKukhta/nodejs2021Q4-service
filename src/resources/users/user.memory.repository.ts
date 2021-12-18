import { IUser } from './user.interface';

import User from './user.model';

const users: Array<IUser> = [];

export const getAll = async () => users;

export const getUser = async (id: IUser['id']) => users.find((user) => user.id === id);

export const createUser = async (newUser: IUser) => {
  const user = new User(newUser);
  users.push(user);
  return user;
};

export const updateUser = async (id: IUser['id'], user: IUser) => {
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

export const deleteUser = async (id: IUser['id']) => {
  let index = -1;
  users.forEach((user, i) => {
    if (user.id === id) {
      index = i;
    }
  });
  if (index !== -1) {
    users.splice(index, 1);
  }
  return index !== -1;
};
