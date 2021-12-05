const router = require('express').Router();
// const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardsService.getBoard(id);
  if (board) {
    res.json(board);
  } else {
    res.status(404);
  }
  res.end();
})

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardsService.createBoard(title, columns);
  if (board) {
    res.status(201).json(board);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const board = req.body;
  const updatedBoard = await boardsService.updateBoard(id, board);
  if (updatedBoard) {
    res.status(200).json(updatedBoard);
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await boardsService.deleteBoard(id);
  res.status(204);
  res.end();
});

module.exports = router;
