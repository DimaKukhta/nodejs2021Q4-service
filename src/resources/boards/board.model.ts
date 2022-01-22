import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import OrmTask from '../tasks/task.model';
import { IBoard } from './board.inteface';
import OrmColumn from './column.model';

@Entity()
class OrmBoard implements IBoard {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column('json', { nullable: true })
  columns!: [OrmColumn];

  @OneToMany(() => OrmTask, (task) => task.boardId)
  tasks!: OrmTask[];
}

export default OrmBoard;
