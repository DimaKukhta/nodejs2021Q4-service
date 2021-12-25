import fastify from 'fastify';
import { isHttpError } from 'http-errors';
import userRouter from './resources/users/user.router';
import boardRouter from './resources/boards/board.router';
import taskRouter from './resources/tasks/task.router';
import logger from './logger';

const app = fastify({
  logger,
});

app.addHook('preHandler', (req, reply, done) => {
  const body = req?.body ? req.body : {};
  req.log.info({ body }, 'body');
  done();
});

app.register(userRouter);
app.register(boardRouter);
app.register(taskRouter);

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
