import { IUser } from "./user.interface";

import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/task.service';

export const getAll = () => usersRepo.getAll();

export const getUser = (id: IUser['id']) => usersRepo.getUser(id);

export const createUser = (user: IUser) => usersRepo.createUser(user);

export const updateUser = (id: IUser['id'], user: IUser) => usersRepo.updateUser(id, user);

export const deleteUser = async (id: IUser['id']) => {
    await tasksService.updateDeleteUserTasks(id);
    return usersRepo.deleteUser(id)
}
