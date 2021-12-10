const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getBoard = (id) => boardsRepo.getBoard(id);

const createBoard = (board) => boardsRepo.createBoard(board);

const updateBoard = (id, board) => boardsRepo.updateBoard(id, board);

const deleteBoard = async (id) => { 
    await tasksService.deleteBoardTasks(id);
    return boardsRepo.deleteBoard(id);
}

module.exports = { getAll, getBoard, createBoard, updateBoard, deleteBoard };
