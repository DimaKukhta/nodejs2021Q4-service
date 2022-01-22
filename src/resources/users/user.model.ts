import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import OrmTask from '../tasks/task.model';
import { IUser } from './user.interface';

@Entity()
class OrmUser implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @OneToMany(() => OrmTask, (task) => task.userId)
  tasks!: OrmTask[];
}

export default OrmUser;
