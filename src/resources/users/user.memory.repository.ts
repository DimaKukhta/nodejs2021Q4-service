import { IUser } from './user.interface';

import User from './user.model';

const users: Array<IUser> = [];

export const getAll = async () => users;
/**
 * Should get array of users
 * @param id - user Id
 * @returns The array of users or empty array
 */
export const getUser = async (id: IUser['id']) => users.find((user) => user.id === id);

/**
 * Should create and push user to array of users
 * @param newUser - Data for new User - { name, login, password }
 * @returns New User
 */
export const createUser = async (newUser: IUser) => {
  const user = new User(newUser);
  users.push(user);
  return user;
};

/**
 * Should update User
 * @param id - User id
 * @param user - New User data
 * @returns updated user or false if user has not been updated
 */
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

/**
 * 
 * @param id - user id
 * @returns true - if user has been updated or false otherwise
 */
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
