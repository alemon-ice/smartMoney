import { ICategory } from '../../interfaces/category';
import { IEntry } from '../../interfaces/entry';

export interface IProps {
  days?: number;
  category?: ICategory;
  onEntryPress(entry: IEntry): void;
  onPressActionButton: () => void;
}
