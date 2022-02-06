import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  getByLogin(login: string) {
    return this.usersRepository.findOne({ login });
  }
}
