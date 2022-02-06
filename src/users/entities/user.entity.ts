import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  static toResponse(user: User) {
    return {
      id: user.id,
      name: user.name,
      login: user.login,
    };
  }
}
