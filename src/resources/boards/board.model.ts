import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Task from '../tasks/task.model';
import { IBoard } from './board.interface';
import BoardColumn from './column.model';

@Entity()
class Board implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar')
  title!: string;

  @OneToMany(() => BoardColumn, (column) => column.board)
  columns!: BoardColumn[];

  @OneToMany(() => Task, (task) => task.boardId)
  tasks!: Task[];
}

export default Board;
