import { getRepository } from 'typeorm';
import { IUser } from './user.interface';
import OrmUser from './user.model';

const getAll = async () => {
  const allUser = await getRepository(OrmUser).find();
  return allUser;
};

/**
 * Should get array of users
 * @param id - user Id
 * @returns The array of users or empty array
 */
 const getUser = async (id: IUser['id']) => {
  const user = await getRepository(OrmUser).findOne(id);
  return user;
}

/**
 * Should create and push user to array of users
 * @param newUser - Data for new User - { name, login, password }
 * @returns New User
 */
 const createUser = async (newUser: IUser) => {
  const user = await getRepository(OrmUser).save(newUser);
  return user;
};

/**
 * Should update User
 * @param id - User id
 * @param user - New User data
 * @returns updated user or false if user has not been updated
 */
 const updateUser = async (userId: IUser['id'], user: IUser) => {
  const updatedUser = await getRepository(OrmUser).update(userId, user);
  return updatedUser.raw;
};

/**
 *
 * @param id - user id
 * @returns true - if user has been updated or false otherwise
 */
 const deleteUser = async (userId: IUser['id']) => {
  const deletedUser = await getRepository(OrmUser).delete(userId);
  return deletedUser;
 }

export default {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};