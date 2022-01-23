import { FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../users/user.interface';
import userService from '../users/user.service';
import { JWT_SECRET_KEY } from '../../common/config';

type FastifyRequestUser = FastifyRequest<{
    Body: IUser;
    Params: {
      userId: string;
    };
  }>;

const loginUserRouter = async (
  request: FastifyRequestUser,
  reply: FastifyReply
) => {
  const { login, password } = request.body;
  const user = await userService.getUserLoginService(login);
  if (user) {
    const isValid = bcrypt.compareSync(password, user?.password);
    if (isValid) {
      const token = jwt.sign({ userId: user.id, login: user.login }, JWT_SECRET_KEY as string);
      reply.code(200).send({ token });
    } else {
      reply.code(401).send();
    }
  } else {
    reply.code(403).send();
  }
};

export default loginUserRouter;
