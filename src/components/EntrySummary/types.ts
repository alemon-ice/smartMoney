export interface IEntrySummary {
  key: string;
  description: string;
  amount: number;
}

export interface IProps {
  entries: IEntrySummary[];
}
