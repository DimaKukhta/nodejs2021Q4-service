import { v4 } from 'uuid';

class Board {
  id: string;

  title: string;

  columns: Array<string>;

  constructor({ id = v4(), title = 'Board1', columns = new Array<string>()} = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
