const User = require('./user.model');
const usersService = require('./user.service');

const userRouter = (fastify, option, done) => {
  fastify.get('/users', async (req, reply) => {
    const users = await usersService.getAll();
    reply.send(users.map(User.toResponse));
  });

  fastify.get('/users/:id', async (req, reply) => {
    const { id } = req.params;
    const user = await usersService.getUser(id);
    reply
      .send(User.toResponse(user));
  });

  fastify.post('/users', async (req, reply) => {
    const { name, login, password } = req.body;
    const user = await usersService.createUser(name, login, password);
    reply
      .code(201) 
      .send(User.toResponse(user));
  });

  fastify.put('/users/:id', async (req, reply) => {
    const { id } = req.params;
    const user = req.body;
    const updatedUser = await usersService.updateUser(id, user);
    reply.send(User.toResponse(updatedUser));
  });

  fastify.delete('/users/:id', async (req, reply) => {
    const { id } = req.params;
    await usersService.deleteUser(id);
    reply.code(204);
  });
  done();
};

module.exports = userRouter;
