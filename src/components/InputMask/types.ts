import { ICategory } from '../../interfaces/category';

export interface IProps {
  debit: number;
  value: string;
  setDebit(debit: number): void;
  changeValue(value: string): void;
  checkCategory?: {
    category: ICategory | null;
    changeCategory(category: ICategory | null): void;
  };
}
