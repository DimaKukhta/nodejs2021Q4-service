import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import OrmUser from '../users/user.model';
import { ITask } from './task.interface';

@Entity()
class OrmTask implements ITask {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ type: 'uuid', nullable: true, name: 'columnId' })
  columnId!: string;

  @Column({ type: 'uuid', nullable: true, name: 'boardId' })
  boardId!: string;

  @ManyToOne(() => OrmUser, (user) => user.tasks, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  userId!: string;
}

export default OrmTask;
