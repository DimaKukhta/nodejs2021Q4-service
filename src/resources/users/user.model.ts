import { v4 } from 'uuid';
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "./user.interface";
import 'reflect-metadata';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: IUser['id'];

  @Column({ length: 50, type: 'varchar' })
  name: IUser['name'];

  @Column({ length: 50, type: 'varchar' })
  login: IUser['login'];

  @Column({ length: 50, type: 'varchar' })
  password: IUser['password'];

  constructor({
    id = v4(),
    name = 'Name1',
    login = 'Login1',
    password = 'Password1'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Should hidden password field from user instance
   * @param user - instance of the User class
   * @returns Object<{id, name, login}>
   */
  static toResponse(user: IUser): IUser {
    const { id, name, login }: IUser = user;
    return { id, name, login };
  }
}
