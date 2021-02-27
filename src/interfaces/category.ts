import { IEntry } from './entry';

export interface ICategory {
  id: string;
  name: string;
  color: string;
  entryType: 'isCredit' | 'isDebit' | 'isInit';
  order: number;
  entries: IEntry[];
}
