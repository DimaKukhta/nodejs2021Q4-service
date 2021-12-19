import { IBoard } from "./board.interface";

import * as boardsRepo from './board.memory.repository';
import * as tasksService from '../tasks/task.service';

/**
 * Should return function from boardsRepo to get all boards
 * @returns Function: () => Promise<IBoard[]>
 */
export const getAll = () => boardsRepo.getAll();

/**
 * Should return function from boardsRepo to get a board by id
 * @param id - board Id
 * @returns Function: () => Promise<IBoard | undefined>
 */
export const getBoard = (id: IBoard['id']) => boardsRepo.getBoard(id);

/**
 * Should return function from boardsRepo to create new board
 * @param board - data for new board
 * @returns Function: () => Promise<IBoard | undefined>
 */
export const createBoard = (board: IBoard) => boardsRepo.createBoard(board);

/**
 * Should return function from boardsRepo to update a board
 * @param id - board id
 * @param board - new data for board
 * @returns Function: () => Promise<IBoard | null>
 */
export const updateBoard = (id: IBoard['id'], board: IBoard) => boardsRepo.updateBoard(id, board);

/**
 * Should return function from boardsRepo to delete a board
 * @param id - board id
 * @returns Function: () => Promise<boolean>
 */
export const deleteBoard = async (id: IBoard['id']) => { 
    await tasksService.deleteBoardTasks(id);
    return boardsRepo.deleteBoard(id);
}
