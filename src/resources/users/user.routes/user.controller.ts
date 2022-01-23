import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcrypt';
import userService from '../user.service';
import OrmUser from '../user.model';
import { IUser } from '../user.interface';
import { BCRYPT_SALT } from '../../../common/config';

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
  const salt = bcrypt.genSaltSync(Number(BCRYPT_SALT) || 10);
  const hash = bcrypt.hashSync(request.body.password, salt); 
  const user: OrmUser = new OrmUser();
  user.name = request.body.name;
  user.login = request.body.login; 
  user.password = hash;
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
  deleteUserRouter
};
