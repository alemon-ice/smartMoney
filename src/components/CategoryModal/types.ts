import { ICategory } from '../../interfaces/category';

export interface IProps {
  debit?: number;
  modalIsVisible: boolean;
  onClose(value: boolean): void;
  onChangeCategory(category: ICategory): void;
}
