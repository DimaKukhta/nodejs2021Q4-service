import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import logger from '../../../logger';
import userSchema from './user.schema';

const userRoutes: FastifyPluginAsync = async (app): Promise<void> => {
  app.get('/*', (_: FastifyRequest, reply: FastifyReply) => {
    reply.status(404).send('Not Found URL');
    logger.warn('Page not found route');
  });

  app.get('/', async (_: FastifyRequest, reply: FastifyReply) => {
    reply.send({ Message: 'Service: is running!' });
    logger.info('');
  });

  app.get('/users', userSchema.getUsersOpts);

  app.get('/users/:userId', userSchema.getUserOpts);

  app.post('/users', userSchema.addUserOpts);

  app.put('/users/:userId', userSchema.updateUserOpts);

  app.delete('/users/:userId', userSchema.deleteUserOpts);
};

export default userRoutes;
