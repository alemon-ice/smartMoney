export interface ICategory {
  id: string;
  name: string;
  color: string;
  entryType: EntryTypeValues;
  order: number;
}

export type EntryTypeValues = 'isCredit' | 'isDebit' | 'isInit';
