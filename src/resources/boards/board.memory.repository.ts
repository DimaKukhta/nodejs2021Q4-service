import { getRepository } from 'typeorm';
import { IBoard } from './board.inteface';
import OrmBoard from './board.model';

/**
 * Should get array of boards
 * @returns array of boards or empty array
 */
 const getAll = async () => {
  const allBoards = await getRepository(OrmBoard).find();
  return allBoards;  
};

/**
 * Should get board by id
 * @param id - board Id
 * @returns board
 */
 const getBoard = async (id: IBoard['id']) => {
  const board = await getRepository(OrmBoard).findOne(id);
  return board;
};

/**
 * Should create new board
 * @param newBoard - data for new board
 * @returns new board
 */
 const createBoard = async (newBoard: IBoard) => {
  const board = await getRepository(OrmBoard).insert(newBoard);
  return board;
};

/**
 * Should update board
 * @param id - board id
 * @param board 
 * @returns updated board or null
 */
 const updateBoard = async (id: IBoard['id'], board: IBoard) => {
  const updatedBoard = await getRepository(OrmBoard).update(id, board);
  return updatedBoard;
};

/**
 * Should delete board
 * @param boardId 
 * @returns true if board has been deleted or false otherwise
 */
 const deleteBoard = async (boardId: IBoard['id']) => {
  const board = await getRepository(OrmBoard).delete(boardId);
  return board;
};

export default {
  getAll,
  getBoard,
  createBoard,
  updateBoard,
  deleteBoard,
};
