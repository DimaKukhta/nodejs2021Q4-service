import { getRepository } from "typeorm";
import { IBoard } from "./board.interface";

import Board from './board.model';

/**
 * Should get array of boards
 * @returns array of boards or empty array
 */
export const getAll = async () => {
  const allBoards = await getRepository(Board).find();
  return allBoards;  
};

/**
 * Should get board by id
 * @param id - board Id
 * @returns board
 */
export const getBoard = async (id: IBoard['id']) => {
  const board = await getRepository(Board).findOne(id);
  return board;
};

/**
 * Should create new board
 * @param newBoard - data for new board
 * @returns new board
 */
export const createBoard = async (newBoard: IBoard) => {
  const board = await getRepository(Board).insert(newBoard);
  return board;
};

/**
 * Should update board
 * @param id - board id
 * @param board 
 * @returns updated board or null
 */
export const updateBoard = async (id: IBoard['id'], board: IBoard) => {
  const updatedBoard = await getRepository(Board).update(id, board);
  return updatedBoard;
};

/**
 * Should delete board
 * @param boardId 
 * @returns true if board has been deleted or false otherwise
 */
export const deleteBoard = async (boardId: IBoard['id']) => {
  const board = await getRepository(Board).delete(boardId);
  return board;
};
