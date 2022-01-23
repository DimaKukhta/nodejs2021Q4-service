import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrmTask from '../tasks/task.model';
import { IColumn } from './board.inteface';
import OrmBoard from './board.model';

@Entity()
class OrmColumn implements IColumn {
  @PrimaryGeneratedColumn('uuid')
  columnId!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => OrmBoard, (board: OrmBoard) => board.columns, {
    cascade: ['remove', 'update'],
  })
  board!: OrmBoard;

  @OneToMany(() => OrmTask, (task) => task.columnId)
  tasks!: OrmTask[];
}

export default OrmColumn;
