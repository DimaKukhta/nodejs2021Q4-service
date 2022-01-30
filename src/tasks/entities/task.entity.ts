import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  @Column({ type: 'uuid', nullable: true, name: 'userId' })
  userId: string;

  @ManyToOne(() => Board, (board) => board.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'boardId' })
  @Column({ type: 'uuid', nullable: true, name: 'boardId' })
  boardId: string;

  @Column({ type: 'uuid', nullable: true, name: 'columnId' })
  columnId: string;
}
