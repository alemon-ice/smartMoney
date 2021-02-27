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
