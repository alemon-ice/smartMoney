import { ICategory } from './category';

export interface IEntry {
  id?: string | null;
  amount: number | string;
  description: string;
  entryAt: Date;
  isInit?: boolean;
  latitude: number | null;
  longitude: number | null;
  address: string | null;
  photo: string | null;
  category: ICategory;
}
