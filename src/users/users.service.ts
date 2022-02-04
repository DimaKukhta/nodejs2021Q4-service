import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const user = await this.usersRepository.findOne({ login: 'admin' });
    if (!user) {
      const newUser = {
        name: 'admin',
        login: 'admin',
        password: 'admin',
      };
      const saltOrRounds = process.env.BCRYPT_SALT;
      const salt = bcrypt.genSaltSync(Number(saltOrRounds) || 10);
      newUser.password = bcrypt.hashSync(newUser.password, salt);
      this.usersRepository.save(newUser);
    }
  }

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}
