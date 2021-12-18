import { IBoard } from "./board.interface";

import Board from './board.model';

const boards: Array<IBoard> = [];

export const getAll = async () => boards;

export const getBoard = async (id: IBoard['id']) => boards.find((board) => board.id === id);

export const createBoard = async (newBoard: IBoard) => {
  const board = new Board(newBoard);
  boards.push(board);
  return board;
};

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

export const deleteBoard = async (boardId: IBoard['id']) => {
  const index = boards.findIndex((element) => element.id === boardId);
  if (index !== -1) {
    boards.splice(index, 1);
    return true;
  }
  return false;
};
