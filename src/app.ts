import fastify, { FastifyRegisterOptions } from 'fastify';
import { isHttpError } from 'http-errors';
import fastifySwagger, { SwaggerOptions } from 'fastify-swagger';
import path from 'path';
import logger from './logger';
import 'reflect-metadata';
import userRouter from './resources/users/user.routes/user.router';
import boardRouter from './resources/boards/board.routes/board.router';
import taskRouter from './resources/tasks/task.routes/task.router';
import loginHookValidation from './resources/login/utils/loginHookValidation';
import loginRouter from './resources/login/login.router';

const app = fastify({
  logger,
});

const optsSwagger: FastifyRegisterOptions<SwaggerOptions> | undefined = {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: '',
  },
};

app.addHook('preHandler', (req, reply, done) => {
  const body = req?.body ? req.body : {};
  req.log.info({ body }, 'body');
  done();
});

app.addHook('preValidation', (req, reply, done) => {
  loginHookValidation(req, reply, done);
});

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);
app.register(loginRouter);

app.register(fastifySwagger, optsSwagger);

app.setErrorHandler((err, _req, res): void => {
  logger.error(err);

  if (isHttpError(err)) {
    res.status(err.statusCode).send(err.message);
  } else if (err.validation) {
    res.status(400).send(err);
  } else {
    res.status(500).send('Unexpected error');
  }
});

process.on('uncaughtException', (err, origin) => {
  logger.fatal(err, 'uncaughtException', { origin });

  setTimeout(() => {
    process.exit(1);
  }, 500);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.fatal(reason, 'unhandledRejection', { promise });

  setTimeout(() => {
    process.exit(1);
  }, 500);
});

export default app;
