import { IUser } from "./user.interface";

import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/task.service';
/**
 * Should return function from usersRepo to get all users
 * @returns Function: () => Promise<IUser[]>
 */
export const getAll = () => usersRepo.getAll();

/**
 * Should return function from usersRepo to get a user by id
 * @param id - user id
 * @returns Function: () => Promise<IUser | undefined>
 */
export const getUser = (id: IUser['id']) => usersRepo.getUser(id);

/**
 * Should return function from userRepo to create new User
 * @param user - user data for function from users repository
 * @returns Function: () => Promise<User>
 */
export const createUser = (user: IUser) => usersRepo.createUser(user);

/**
 * Should return function from userRepo to update user
 * @param id - user id
 * @param user - user data for update
 * @returns Function: () => Promise<false | IUser>
 */
export const updateUser = (id: IUser['id'], user: IUser) => usersRepo.updateUser(id, user);

/**
 * Should return function from userRepo to delete user
 * @param id - user Id
 * @returns Function: () => Promise<boolean>
 */
export const deleteUser = async (id: IUser['id']) => {
    await tasksService.updateDeleteUserTasks(id);
    return usersRepo.deleteUser(id)
}
