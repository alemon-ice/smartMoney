import { getRealm } from './Realm';

import { defaultCategories } from '../util/defaultCategories';
import { ICategory } from '../interfaces/category';

export const getDefaultCategories = (): ICategory[] => {
  const {
    debitCategories,
    creditCategories,
    initialCategories,
  } = defaultCategories;

  return debitCategories.concat(creditCategories.concat(initialCategories));
};

export const getCategories = async (
  entryType?: 'isCredit' | 'isDebit' | 'isInit',
): Promise<ICategory[]> => {
  const realm = await getRealm();

  if (entryType === 'isDebit')
    return realm
      .objects('Category')
      .filtered('entryType == isDebit')
      .sorted('order')
      .toJSON();
  if (entryType === 'isCredit')
    return realm
      .objects('Category')
      .filtered('entryType = isCredit')
      .sorted('order')
      .toJSON();
  if (entryType === 'isInit')
    return realm
      .objects('Category')
      .filtered('entryType = isInit')
      .sorted('order')
      .toJSON();
  return realm.objects('Category').sorted('order').toJSON();
};
