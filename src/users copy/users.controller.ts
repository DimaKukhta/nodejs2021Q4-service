import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = createUserDto as User;
    const saltOrRounds = process.env.BCRYPT_SALT;

    const salt = bcrypt.genSaltSync(Number(saltOrRounds) || 10);
    user.password = bcrypt.hashSync(user.password, salt);

    const createdUser = await this.usersService.create(user);
    return User.toResponse(createdUser);
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => User.toResponse(user));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    return User.toResponse(user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = updateUserDto as User;
    const saltOrRounds = process.env.BCRYPT_SALT;

    const salt = bcrypt.genSaltSync(Number(saltOrRounds) || 10);
    user.password = bcrypt.hashSync(user.password, salt);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
