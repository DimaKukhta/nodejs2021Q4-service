import { IsString } from 'class-validator';

export class CreateTokenDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
