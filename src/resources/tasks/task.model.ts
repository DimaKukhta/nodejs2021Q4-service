import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../users/user.model';

@Entity()
class Task {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 50, type: 'varchar' })
  title!: string;

  @Column('int')
  order!: number;

  @Column('varchar')
  description!: string;

  @Column({ nullable: true })
  columnId!: string | null;

  @Column({ nullable: true })
  boardId!: string | null;

  @ManyToOne(() => User, (user) => user.tasks, {
    nullable: true,
  })
  userId!: string | null;
}

export default Task;
