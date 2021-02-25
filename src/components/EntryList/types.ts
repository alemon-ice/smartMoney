import { IEntry } from '../../interfaces/entry';

export interface IProps {
  onEntryPress(entry: IEntry): void;
  onPressActionButton: () => void;
}
