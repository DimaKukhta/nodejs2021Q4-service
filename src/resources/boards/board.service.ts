/* eslint-disable no-return-await */
import boardsRepo from './board.memory.repository';
import taskServiceBoard from '../tasks/task.service';
import OrmBoard from './board.model';

/**
 * Should return boards of the call getAll function
 * @returns IBoard[]
 */
const getBoardsAllService = async (): Promise<object> =>
  await boardsRepo.getAll();

/**
 * Should return board of the call getBoard function
 * @param boardId - id of board
 * @returns IBoard
 */
const getBoardIdService = async (
  boardId: string
): Promise<object | undefined> => await boardsRepo.getBoard(boardId);

/**
 * Should create board of the call createBoard function
 * @param board - board data
 * @returns void
 */
const addBoardService = async (board: OrmBoard) => {
  await boardsRepo.createBoard(board);
};

/**
 * Should update board of the call updateBoard function
 * @param boardId - id of board
 * @param updBoard - new data of board
 * @returns void
 */
const updateBoardService = async (boardId: string, updBoard: OrmBoard) => {
  await boardsRepo.updateBoard(boardId, updBoard);
};

/**
 * Should delete board of the call deleteBoard and deleteTaskFromBoardService functions
 * @param boardId - id of board
 * @returns void
 */
const deleteBoardService = async (boardId: string) => {
  await boardsRepo.deleteBoard(boardId);
  await taskServiceBoard.deleteTaskFromBoardService(boardId);
};

export default {
  getBoardsAllService,
  getBoardIdService,
  addBoardService,
  deleteBoardService,
  updateBoardService,
};
