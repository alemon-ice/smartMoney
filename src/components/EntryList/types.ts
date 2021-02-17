export interface IEntry {
  key: string;
  description: string;
  amount: number;
}

export interface IProps {
  entries: IEntry[];
}
