const tasksService = require('./task.service');

const taskRouter = (fastify, option, done) => {
  fastify.get('/boards/:boardId/tasks', async (req, reply) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);
    reply.send(tasks);
  });

  fastify.get('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const { boardId, taskId } = req.params;
    const task = await tasksService.getTask(boardId, taskId);
    reply.send(task);
  });

  fastify.post('/boards/:boardId/tasks', async (req, reply) => {
    const task = req.body;
    const { boardId } = req.params;
    const newTask = await tasksService.createTask({ ...task, boardId });
    reply.code(201).send(newTask);
  });

  fastify.put('/boards/:boardId/tasks/taskId', async (req, reply) => {
    const { taskId } = req.params;
    const task = req.body;
    const updatedTask = await tasksService.updateTask(taskId, task);
    reply.code(201).send(updatedTask);
  });

  fastify.delete('/boards/:boardId/tasks/taskId', async (req, reply) => {
    const { taskId } = req.params;
    await tasksService.deleteTask(taskId);
    reply.code(204);
  });
  done();
};

module.exports = taskRouter;
