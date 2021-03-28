import { IEntry } from '../../../interfaces/entry';

export interface IProps {
  entry: IEntry;
  isFirstItem: boolean;
  isLastItem: boolean;
  onEntryPress?: (entry: IEntry) => void;
}
