import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { IUser } from './user.interface';

import User from './user.model';
import * as usersService from './user.service';

interface IParams {
  id: string;
}

const userRouter = (
  fastify: FastifyInstance,
  option: FastifyPluginOptions,
  done: () => void
) => {
  /**
   * Should get all users and send them
   */
  fastify.get('/users', async () => {
    const users = await usersService.getAll();
    return users.map(User.toResponse);
  });

  /**
   * Should get a user by id and send it
   */
  fastify.get<{ Params: IParams }>('/users/:id', async (req, reply) => {
    const { id } = req.params;
    const user = await usersService.getUser(id);
    if (user) {
      return User.toResponse(user);
    }
    reply.code(404);
    return { message: 'User not found' };
  });

  /**
   * Should create a new user and send it
   */
  fastify.post<{ Body: IUser }>('/users', async (req, reply) => {
    const user: IUser = await usersService.createUser(req.body);
    if (user) {
      reply.code(201);
      return User.toResponse(user);
    }
    reply.code(400);
    return { message: 'Bad request' };
  });

  /**
   * Should update a user and send it
   */
  fastify.put<{ Params: IParams; Body: IUser }>(
    '/users/:id',
    async (req, reply) => {
      const { id } = req.params;
      const updatedUser = await usersService.updateUser(id, {
        id,
        ...req.body,
      });
      if (updatedUser) {
        return User.toResponse(updatedUser);
      }
      reply.code(200);
      return { message: 'Bad request' };
    }
  );

  /**
   * Should delete a user
   */
  fastify.delete<{ Params: IParams }>('/users/:id', async (req, reply) => {
    const { id } = req.params;
    const result = await usersService.deleteUser(id);
    if (result) {
      reply.code(204);
      return;
    }
    reply.code(400);
  });
  done();
};

export default userRouter;
