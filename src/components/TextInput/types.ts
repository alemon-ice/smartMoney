import { TextInputProps } from 'react-native';

export interface IProps extends TextInputProps {
  value: string;
  onChangeValue(value: string): void;
}
