import { FastifyPluginAsync } from 'fastify';
import loginShema from './login.schema';

const loginRoutes: FastifyPluginAsync = async (app): Promise<void> => {
  app.post('/login', loginShema);
};

export default loginRoutes;
