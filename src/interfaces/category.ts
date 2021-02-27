import { IEntry } from './entry';

export interface ICategory {
  id: string;
  name: string;
  color: string;
  entryType: EntryTypeValues;
  order: number;
  entries: IEntry[];
}

export type EntryTypeValues = 'isCredit' | 'isDebit' | 'isInit';
