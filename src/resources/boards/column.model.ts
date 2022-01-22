import {
    Column,
    Entity,
    OneToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import Task from '../tasks/task.model';
import Board from './board.model';
  
  @Entity()
  class BoardColumn {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
  
    @Column()
    title!: string;
  
    @Column()
    order!: number;
  
    @ManyToOne(() => Board, (board: Board) => board.columns, {
      cascade: true,
    })
    board!: Board;
  
    @OneToMany(() => Task, (task) => task.columnId)
    tasks!: Task[];
  }
  
  export default BoardColumn;