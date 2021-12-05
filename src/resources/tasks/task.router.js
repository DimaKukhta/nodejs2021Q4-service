const router = require('express').Router();
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  console.log(boardId);
  const tasks = await tasksService.getAll();
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  console.log(req)
  const { id } = req.params;
  const task = await tasksService.getTask(id);
  if (task) {
    res.json(task);
  } else {
    res.status(404);
  }
  res.end();
})

router.route('/').post(async (req, res) => {
  console.log(req)
  const taskBody = req.body;
  console.log(req.params)
  const task = await tasksService.createTask(taskBody);
  if (task) {
    res.status(201).json(task);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const task = req.body;
  const updatedTask = await tasksService.updateTask(id, task);
  if (updatedTask) {
    res.status(200).json(updatedTask);
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await tasksService.deleteTask(id);
  res.status(204);
  res.end();
});

module.exports = router;
