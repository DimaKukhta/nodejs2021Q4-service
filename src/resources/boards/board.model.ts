import { Column, Entity, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity()
class Board {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar')
  title: string;

  @Column('json')
  columns: Array<string>;

  constructor({ id = v4(), title = 'Board1', columns = new Array<string>()} = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

export default Board;
