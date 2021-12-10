const boardsService = require('./board.service');

const boardRouter = (fastify, option, done) => {
  fastify.get('/boards', async (req, reply) => {
    const boards = await boardsService.getAll();
    reply.send(boards);
  });

  fastify.get('/boards/:id', async (req, reply) => {
    const { id } = req.params;
    const board = await boardsService.getBoard(id);
    if (board) {
      return board;
    }
    reply.code(404);
    return { message: 'Board not found' };
  });

  fastify.post('/boards', async (req, reply) => {
    const board = await boardsService.createBoard(req.body);
    if (board) {
      reply.code(201);
      return board;
    }
    reply.code(400);
    return { message: 'Bad request' };
  });

  fastify.put('/boards/:id', async (req, reply) => {
    const { id } = req.params;
    const updatedBoard = await boardsService.updateBoard(id, req.body);
    if (updatedBoard) {
      reply.code(200);
      return updatedBoard;
    }
    reply.code(400);
    return { message: 'Bad request' };
  });

  fastify.delete('/boards/:id', async (req, reply) => {
    const { id } = req.params;
    const result = await boardsService.deleteBoard(id);
    if (result) {
      reply.code(204);
      return;
    }
    reply.code(400);
  });
  done();
};

module.exports = boardRouter;
