import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IColumn } from '../interface';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'json', nullable: true })
  columns: IColumn[];
}
