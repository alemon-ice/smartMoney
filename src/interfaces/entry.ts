export interface IEntry {
  id?: string | null;
  amount: number | string;
  description: string;
  entryAt: Date;
  isInit?: boolean;
  // latitude: number;
  // longitude: number;
  // address: string;
  // photo: string;
  // category: ICategory;
}
