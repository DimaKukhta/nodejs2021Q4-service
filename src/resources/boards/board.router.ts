import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { IBoard } from "./board.interface";

import * as boardsService from './board.service';

interface IParams {
  id: string;
}


const boardRouter = (
  fastify: FastifyInstance,
  option: FastifyPluginOptions,
  done: () => void
) => {
  /**
   * Should get all board and send them
   */
  fastify.get('/boards', async (req, reply) => {
    const boards = await boardsService.getAll();
    reply.send(boards);
  });

  /**
   * Should get board by id and send it
   */
  fastify.get<{ Params: IParams }>('/boards/:id', async (req, reply) => {
    const { id } = req.params;
    const board = await boardsService.getBoard(id);
    if (board) {
      return board;
    }
    reply.code(404);
    return { message: 'Board not found' };
  });

  /**
   * Should create new board and send it
   */
  fastify.post<{ Params: IParams, Body: IBoard }>('/boards', async (req, reply) => {
    const board = await boardsService.createBoard(req.body);
    if (board) {
      reply.code(201);
      return board;
    }
    reply.code(400);
    return { message: 'Bad request' };
  });

  /**
   * Should update a board by id and send it
   */
  fastify.put<{ Params: IParams, Body: IBoard }>('/boards/:id', async (req, reply) => {
    const { id } = req.params;
    const updatedBoard = await boardsService.updateBoard(id, req.body);
    if (updatedBoard) {
      reply.code(200);
      return updatedBoard;
    }
    reply.code(400);
    return { message: 'Bad request' };
  });

  /**
   * Should delete a delete board by id
   */
  fastify.delete<{ Params: IParams }>('/boards/:id', async (req, reply) => {
    const { id } = req.params;
    const result = await boardsService.deleteBoard(id);
    if (result) {
      reply.code(204);
      return;
    }
    reply.code(400);
  });
  done();
};

export default boardRouter;
