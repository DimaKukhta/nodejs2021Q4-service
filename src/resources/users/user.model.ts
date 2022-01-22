import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { IUser } from "./user.interface";
import 'reflect-metadata';
import Task from '../tasks/task.model';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: IUser['id'];

  @Column({ length: 50, type: 'varchar' })
  name!: IUser['name'];

  @Column({ length: 50, type: 'varchar' })
  login!: IUser['login'];

  @Column({ length: 50, type: 'varchar' })
  password!: IUser['password'];

  @OneToMany(() => Task, (task) => task.userId)
  tasks!: Task[];

  /**
   * Should hidden password field from user instance
   * @param user - instance of the User class
   * @returns Object<{id, name, login}>
   */
  static toResponse(user: IUser) {
    const { id, name, login }: IUser = user;
    return { id, name, login };
  }
}
