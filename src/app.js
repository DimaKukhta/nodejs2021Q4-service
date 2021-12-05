// const express = require('express');
// const swaggerUI = require('swagger-ui-express');
// const path = require('path');
// const YAML = require('yamljs');
const fastify = require('fastify');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = fastify({ logger: true });

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

// const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

// app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
