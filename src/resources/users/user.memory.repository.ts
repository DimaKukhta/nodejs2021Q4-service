import { getRepository } from 'typeorm';
import { IUser } from './user.interface';
import User from './user.model';

export const getAll = async () => {
  const allUser = await getRepository(User).find();
  return allUser;
};
/**
 * Should get array of users
 * @param id - user Id
 * @returns The array of users or empty array
 */
export const getUser = async (id: IUser['id']) => {
  const user = await getRepository(User).findOne(id);
  return user;
}
/**
 * Should create and push user to array of users
 * @param newUser - Data for new User - { name, login, password }
 * @returns New User
 */
export const createUser = async (newUser: IUser) => {
  const user = await getRepository(User).save(newUser);
  return user;
};

/**
 * Should update User
 * @param id - User id
 * @param user - New User data
 * @returns updated user or false if user has not been updated
 */
export const updateUser = async (userId: IUser['id'], user: IUser) => {
  const updatedUser = await getRepository(User).update(userId, user);
  return updatedUser.raw;
};

/**
 *
 * @param id - user id
 * @returns true - if user has been updated or false otherwise
 */
export const deleteUser = async (userId: IUser['id']) => {
  const deletedUser = await getRepository(User).delete(userId);
  return deletedUser;
};
