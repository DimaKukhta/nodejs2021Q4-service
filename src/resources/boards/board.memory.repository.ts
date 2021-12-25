import { IBoard } from "./board.interface";

import Board from './board.model';

const boards: Array<IBoard> = [];

/**
 * Should get array of boards
 * @returns array of boards or empty array
 */
export const getAll = async () => boards;

/**
 * Should get board by id
 * @param id - board Id
 * @returns board
 */
export const getBoard = async (id: IBoard['id']) => boards.find((board) => board.id === id);

/**
 * Should create new board
 * @param newBoard - data for new board
 * @returns new board
 */
export const createBoard = async (newBoard: IBoard) => {
  const board = new Board(newBoard);
  boards.push(board);
  return board;
};

/**
 * Should update board
 * @param id - board id
 * @param board 
 * @returns updated board or null
 */
export const updateBoard = async (id: IBoard['id'], board: IBoard) => {
  let index = null;
  boards.forEach((oldBoard, i) => {
    if (oldBoard.id === id) {
      index = i;
    }
  });
  if (index !== null) {
    boards[index] = { ...boards[index], ...board };
    return boards[index];
  }
  return null;
};

/**
 * Should delete board
 * @param boardId 
 * @returns true if board has been deleted or false otherwise
 */
export const deleteBoard = async (boardId: IBoard['id']) => {
  const index = boards.findIndex((element) => element.id === boardId);
  if (index !== -1) {
    boards.splice(index, 1);
    return true;
  }
  return false;
};
