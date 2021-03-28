import { ICategory } from '../../../interfaces/category';

export interface IProps {
  debit: number;
  category: ICategory;
  changeCategory(category: ICategory | null): void;
}
