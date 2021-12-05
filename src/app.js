const fastify = require('fastify');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = fastify({ logger: true });

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

module.exports = app;
