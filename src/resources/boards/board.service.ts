import { IBoard } from "./board.interface";

import * as boardsRepo from './board.memory.repository';
import * as tasksService from '../tasks/task.service';

export const getAll = () => boardsRepo.getAll();

export const getBoard = (id: IBoard['id']) => boardsRepo.getBoard(id);

export const createBoard = (board: IBoard) => boardsRepo.createBoard(board);

export const updateBoard = (id: IBoard['id'], board: IBoard) => boardsRepo.updateBoard(id, board);

export const deleteBoard = async (id: IBoard['id']) => { 
    await tasksService.deleteBoardTasks(id);
    return boardsRepo.deleteBoard(id);
}
