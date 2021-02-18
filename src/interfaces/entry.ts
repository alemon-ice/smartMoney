export interface IEntry {
  id?: string;
  amount: number;
  description?: string;
  entryAt: Date;
  latitude?: number;
  longitude?: number;
  address?: string;
  photo?: string;
  isInit: boolean;
  // category: ICategory;
  category?: string;
}
