import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { P } from 'pino';

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

  async findOne(id: string) {
    const user = this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(user);
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.usersRepository.remove(user);
  }
}
