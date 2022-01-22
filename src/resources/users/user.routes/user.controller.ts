import { FastifyRequest, FastifyReply } from 'fastify';
import userService from '../user.service';
import OrmUser from '../user.model';
import { IUser } from '../user.interface';

type FastifyRequestUser = FastifyRequest<{
  Body: IUser;
  Params: {
    userId: string;
  };
}>;

const getUsersAllRouter = async (_: FastifyRequest, reply: FastifyReply) => {
  const users = await userService.getUsersAllService();
  reply.code(200).send(users);
};

const getUserIdRouter = async (
  request: FastifyRequestUser,
  reply: FastifyReply
) => {
  const { userId } = request.params;

  if (await userService.getUserIdService(userId)) {
    const user = await userService.getUserIdService(userId);
    reply.code(200).send(user);
  } else {
    reply.code(404).send();
  }
};

const addUserRouter = async (
  request: FastifyRequestUser,
  reply: FastifyReply
) => {
  const user: OrmUser = new OrmUser();
  user.name = request.body.name;
  user.login = request.body.login;
  user.password = request.body.password;
  await userService.addUserService(user);
  reply.code(201).send(user);
};

const updateUserRouter = async (
  request: FastifyRequestUser,
  reply: FastifyReply
) => {
  const { userId } = request.params;

  if (await userService.getUserIdService(userId)) {
    const updUser: IUser = new OrmUser();
    updUser.id = userId;
    updUser.name = request.body.name;
    updUser.login = request.body.login;
    updUser.password = request.body.password;
    await userService.updateUserService(userId, updUser);
    reply.code(200).send(updUser);
  } else {
    reply.code(404).send();
  }
};

const deleteUserRouter = async (
  request: FastifyRequestUser,
  reply: FastifyReply
) => {
  const { userId } = request.params;

  if (await userService.getUserIdService(userId)) {
    await userService.deleteUserService(userId);
    reply.code(204);
  } else {
    reply.code(404).send();
  }
};

export default {
  getUsersAllRouter,
  getUserIdRouter,
  addUserRouter,
  updateUserRouter,
  deleteUserRouter,
};
