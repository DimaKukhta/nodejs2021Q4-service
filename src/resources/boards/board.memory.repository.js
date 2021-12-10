const Board = require('./board.model');

const boards = [];

const getAll = async () => boards;

const getBoard = async (id) => boards.find((board) => board.id === id);

const createBoard = async (newBoard) => {
  const board = new Board(newBoard);
  boards.push(board);
  return board;
};

const updateBoard = async (id, board) => {
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

const deleteBoard = async (boardId) => {
  const index = boards.findIndex((element) => element.id === boardId);
  if (index !== -1) {
    boards.splice(index, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
