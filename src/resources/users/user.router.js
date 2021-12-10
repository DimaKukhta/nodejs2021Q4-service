const User = require('./user.model');
const usersService = require('./user.service');

const userRouter = (fastify, option, done) => {
  fastify.get('/users', async () => {
    const users = await usersService.getAll();
    return users.map(User.toResponse);
  });

  fastify.get('/users/:id', async (req, reply) => {
    const { id } = req.params;
    const user = await usersService.getUser(id);
    if (user) {
      return User.toResponse(user);
    }
    reply.code(404);
    return { message: 'User not found' };
  });

  fastify.post('/users', async (req, reply) => {
    const user = await usersService.createUser(req.body);
    if (user) {
      reply.code(201);
      return User.toResponse(user);
    }
    reply.code(400);
    return { message: 'Bad request' };
  });

  fastify.put('/users/:id', async (req, reply) => {
    const { id } = req.params;
    const updatedUser = await usersService.updateUser(id, { id, ...req.body });
    if (updatedUser) {
      return User.toResponse(updatedUser);
    }
    reply.code(200);
    return { message: 'Bad request' };
  });

  fastify.delete('/users/:id', async (req, reply) => {
    const { id } = req.params;
    const result = await usersService.deleteUser(id);
    if (result) {
      reply.code(204);
      return;
    }
    reply.code(400);
  });
  done();
};

module.exports = userRouter;
