export interface IColumn {
  columnId: string;
  title: string;
  order: number;
}

export interface IBoard {
  id: string;
  title: string;
  columns: [IColumn];
}
