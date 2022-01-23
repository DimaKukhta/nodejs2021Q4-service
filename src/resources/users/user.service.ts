/* eslint-disable no-return-await */
import usersRepo from './user.memory.repository';
import taskServiceUser from '../tasks/task.service';
import OrmUser from './user.model';
import { IUser } from './user.interface';

/**
 * Should return all users out of the call getAll function
 * @returns IUser[]
 */
const getUsersAllService = async (): Promise<object> =>
  await usersRepo.getAll();

/**
 * Should return user by id out of the call getUser function
 * @param userId - user id
 * @returns IUser | undefined
 */
const getUserIdService = async (userId: string): Promise<object | undefined> =>
  await usersRepo.getUser(userId);

/**
 * 
 * @param login - login of user
 * @returns IUser | undefined
 */
const getUserLoginService = async (login: IUser['login']) => 
  await usersRepo.getUserbyLogin(login);

/**
 * Should create user out of the call createUser function
 * @param user -new user
 * @returns void
 */
const addUserService = async (newUser: OrmUser) => {
  await usersRepo.createUser(newUser);
};

/**
 * Should update user by id out of the call updateUser function
 * @param userId - id of user
 * @param updUser - new data
 * @returns void
 */
const updateUserService = async (userId: string, updUser: IUser) => {
  await usersRepo.updateUser(userId, updUser);
};

/**
 * Should delete user by id out of the call deleteUser and updateUserIdService functions
 * @param userId - id of user
 * @returns void
 */
const deleteUserService = async (userId: string) => {
  await usersRepo.deleteUser(userId);
  await taskServiceUser.updateUserIdService(userId);
};

export default {
  getUsersAllService,
  getUserIdService,
  addUserService,
  updateUserService,
  deleteUserService,
  getUserLoginService,
};
