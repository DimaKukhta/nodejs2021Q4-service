import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsNumber()
  order: number;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  columnId: string;

  @IsString()
  @IsOptional()
  boardId: string;

  @IsString()
  @IsOptional()
  userId: string;
}
