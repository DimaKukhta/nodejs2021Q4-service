import { Controller, Post, Body, HttpException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { LoginService } from './login.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async create(@Body() createTokenDto: CreateTokenDto) {
    const { login, password } = createTokenDto;
    const user = await this.loginService.getByLogin(login);
    if (!user) {
      throw new HttpException('Invalid login', 401);
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw new HttpException('Invalid password', 401);
    }
    const token = jwt.sign(
      { userId: user.id, login: user.login },
      process.env.JWT_SECRET_KEY as string,
    );
    return { token };
  }
}
