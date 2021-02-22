import { IEntry } from '../../interfaces/entry';

export interface IProps {
  onNewEntryPress(entry: IEntry): void;
}
