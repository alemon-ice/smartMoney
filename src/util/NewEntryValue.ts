import { IEntry } from '../interfaces/entry';
import { ICategory } from '../interfaces/category';

export const defaultInitalEntry: IEntry = {
  id: null,
  amount: '0.00',
  description: '',
  entryAt: new Date(),
  latitude: null,
  longitude: null,
  address: null,
  category: {
    id: '',
    name: 'Selecionar categoria',
  } as ICategory,
};
