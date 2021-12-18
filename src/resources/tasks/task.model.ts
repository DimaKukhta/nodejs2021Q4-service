import { v4 } from 'uuid';

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string | null;

  columnId: string | null;

  constructor({
    id = v4(),
    title = 'Board1',
    order = 0,
    description = 'Description1',
    userId = null as string | null,
    boardId = null as string | null,
    columnId = null as string | null,
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
