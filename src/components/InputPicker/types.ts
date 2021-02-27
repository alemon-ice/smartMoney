import { ICategory } from '../../interfaces/category';

export interface IProps {
  debit: number;
  category: ICategory;
  setCategory(category: ICategory): void;
}
