import { getRealm } from './Realm';

export const getBalance = async (): Promise<number> => {
  const realm = await getRealm();

  const entries = realm.objects('Entry');

  return entries.sum('amount') || 0;
};
