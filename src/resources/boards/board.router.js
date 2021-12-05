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
      reply.send(board);
    } else {
      reply.code(404);
    }
  });

  fastify.post('/boards', async (req, reply) => {
    const { title, columns } = req.body;
    const board = await boardsService.createBoard(title, columns);
    if (board) {
      reply.code(201).send(board);
    }
  });

  fastify.put('/boards/:id', async (req, reply) => {
    const { id } = req.params;
    const board = req.body;
    const updatedBoard = await boardsService.updateBoard(id, board);
    if (updatedBoard) {
      reply.code(200).send(updatedBoard);
    }
  });

  // fastify.delete('/boards/:id', async (req, reply) => {
  //   const { id } = req.params;
  //   await boardsService.deleteBoard(id);
  //   reply.code(204);
  // });
  done();
};

module.exports = boardRouter;
