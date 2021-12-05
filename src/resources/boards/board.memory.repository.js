const Board = require('./board.model');

const boards = [];

const getAll = async () => boards;

const getBoard = async (id) => boards.find((board) => board.id === id);

const createBoard = async (title, columns) => {
  const board = new Board({ title, columns });
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
  if (index) {
    boards[index] = { ...boards[index], ...board };
    return boards[index];
  }
  return null;
};

const deleteBoard = async (id) => {
  let index = null;
  boards.forEach((board, i) => {
    if (board.id === id) {
      index = i;
    }
  });

  boards.slice(index, 1);
};

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
