import { EntryTypeValues } from '../interfaces/category';

export const checkIfValueIsPositive = (value: number): boolean => {
  if (value < 0) return false;
  return true;
};

export const isCreditOrDebit = (debit: number): EntryTypeValues => {
  if (debit === 1) {
    return 'isCredit';
  }
  return 'isDebit';
};

export const convertInputMaskValue = ({
  value,
  to,
}: {
  value: string;
  to: 'string' | 'number';
}): string => {
  switch (to) {
    case 'string': {
      return value
        .split('.')
        .reduce((acc, item) => acc + item)
        .replace(',', '.');
    }
    case 'number': {
      return value.indexOf('.') >= 0 ? value.replace('.', ',') : `${value},00`;
    }
    default:
      return value;
  }
};
