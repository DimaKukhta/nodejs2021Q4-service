/* eslint-disable no-param-reassign */
import { v4 as uuid } from 'uuid';
import { FastifyRequest, FastifyReply } from 'fastify';
import boardService from '../board.service';
import OrmBoard from '../board.model';

type FastifyRequestBoard = FastifyRequest<{
  Body: OrmBoard;
  Params: {
    boardId: string;
  };
}>;

const getBoardsAllRouter = async (_: FastifyRequest, reply: FastifyReply) => {
  const board = await boardService.getBoardsAllService();
  reply.code(200).send(board);
};

const getBoardIdRouter = async (
  request: FastifyRequestBoard,
  reply: FastifyReply
) => {
  const { boardId } = request.params;

  if (await boardService.getBoardIdService(boardId)) {
    const board = await boardService.getBoardIdService(boardId);
    reply.code(200).send(board);
  } else {
    reply.code(404).send();
  }
};

const addBoardRouter = async (
  request: FastifyRequestBoard,
  reply: FastifyReply
) => {
  const columnsArray = request.body.columns;
  columnsArray.forEach((column: { columnId: string }) => {
    column.columnId = uuid();
  });
  const board: OrmBoard = new OrmBoard();
  board.title = request.body.title;
  board.columns = request.body.columns;
  await boardService.addBoardService(board);
  reply.code(201).send(board);
};

const updateBoardRouter = async (
  request: FastifyRequestBoard,
  reply: FastifyReply
) => {
  const { boardId } = request.params;

  if (await boardService.getBoardIdService(boardId)) {
    const updBoard: OrmBoard = new OrmBoard();
    updBoard.id = boardId;
    updBoard.title = request.body.title;
    updBoard.columns = request.body.columns;
    await boardService.updateBoardService(boardId, updBoard);
    reply.code(200).send(updBoard);
  } else {
    reply.code(404).send();
  }
};

const deleteBoardRouter = async (
  request: FastifyRequestBoard,
  reply: FastifyReply
) => {
  const { boardId } = request.params;

  if (await boardService.getBoardIdService(boardId)) {
    await boardService.deleteBoardService(boardId);
    reply.code(204).send();
  } else {
    reply.code(404).send();
  }
};

export default {
  getBoardsAllRouter,
  getBoardIdRouter,
  addBoardRouter,
  deleteBoardRouter,
  updateBoardRouter,
};
