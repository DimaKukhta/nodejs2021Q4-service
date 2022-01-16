import { v4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from '../users/user.model';
import Board from '../boards/board.model';

@Entity()
class Task {
  @PrimaryColumn()
  id: string;

  @Column({ length: 50, type: 'varchar' })
  title: string;

  @Column('int')
  order: number;

  @Column('varchar')
  description: string;

  @Column({ nullable: true, type: 'uuid' })
  userId: string | null;

  @ManyToOne(() => User, (task) => task.id)
  @JoinColumn({ name: 'userId' })
  user!: User | null;

  @Column({ nullable: true, type: 'uuid' })
  boardId: string | null;

  @ManyToOne(() => Board, (board) => board.id)
  @JoinColumn({ name: 'boardId' })
  board!: Board;

  @Column({ nullable: true, type: 'uuid' })
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
