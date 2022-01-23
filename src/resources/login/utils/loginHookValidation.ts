import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../../common/config';

const freeRoutes = ['/', '/login', '/doc'];

const loginHookValidation = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: () => void
) => {
  const { url } = request;
  const header = request?.headers?.authorization;
  if (!freeRoutes.includes(url) && !url.startsWith('/doc')) {
    if (header) {
      try {
        const token = header?.split(' ')[1];
        const isVerify = jwt.verify(token, JWT_SECRET_KEY as string);
        if (isVerify) {
          done(); 
        } else {
          throw new Error();
        }
      } catch (e) {
        reply.code(401).send();
      }
    } else {
        reply.code(401).send();
    }
  } else {
    done();
  }
};

export default loginHookValidation;
