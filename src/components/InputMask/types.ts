import { TextInputMaskProps } from 'react-native-masked-text';

export interface IProps extends TextInputMaskProps {
  debit: number;
  setDebit(debit: number): void;
  onChangeValue(value: string): void;
}
