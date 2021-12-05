const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.json(users.map(User.toResponse));
  res.end();
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getUser(id);
  if (user) {
    res.json(User.toResponse(user));
  } else {
    // res.status(404);
  }
  res.end();
})

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = await usersService.createUser(name, login, password);
  if (user) {
    res.status(201).json(User.toResponse(user));
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const user = req.body;
  const updatedUser = await usersService.updateUser(id, user);
  if (user) {
    res.status(200).json(User.toResponse(updatedUser));
  }
});

router.route('/:id').delete(async (req, res) => {
  const { id } = req.params;
  await usersService.deleteUser(id);
  res.status(204);
  res.end();
});

module.exports = router;
