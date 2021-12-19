import { v4 } from 'uuid';
import { IUser } from "./user.interface";

class User {
  id: IUser['id'];

  name: IUser['name'];

  login: IUser['login'];

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

export default User;
