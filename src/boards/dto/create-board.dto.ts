import { IColumn } from '../interface';

export class CreateBoardDto {
  title: string;
  columns: IColumn[];
}
