const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoard = (id) => boardsRepo.getBoard(id);

const createBoard = (title, columns) => boardsRepo.createBoard(title, columns);

const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);

const deleteBoard = (id) => boardsRepo.deleteBoard(id);

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
