import { IsArray, IsString } from 'class-validator';
import { IColumn } from '../interface';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsArray()
  columns: IColumn[];
}
