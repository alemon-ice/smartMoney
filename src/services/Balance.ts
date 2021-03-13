import _ from 'lodash';
import { getRealm } from './Realm';
import { moment } from '../vendors';

import { IEntry } from '../interfaces/entry';

export const getBalance = async (untilDays = 0): Promise<number> => {
  const realm = await getRealm();

  let entries = realm.objects('Entry');

  if (untilDays > 0) {
    const date = moment().subtract(untilDays, 'days').toDate();
    entries = entries.filtered('entryAt < $0', date);
  }

  return entries.sum('amount') || 0;
};

export const getBalanceSumByDate = async (days: number): Promise<IEntry[]> => {
  const realm = await getRealm();

  const startBalance = await getBalance(days);

  let entries: any = realm.objects('Entry');

  if (days > 0) {
    const date = moment().subtract(days, 'days').toDate();
    entries = entries.filtered('entryAt >= $0', date);
  }

  entries = entries.sorted('entryAt');

  entries = _(entries)
    .groupBy(({ entryAt }) => moment(entryAt).format('YYYYMMDD'))
    .map(entry => _.sumBy(entry, 'amount'))
    .map(
      (amount, index, collection) =>
        (index === 0 ? startBalance : 0) +
        _.sum(_.slice(collection, 0, index)) +
        amount,
    );

  return entries as IEntry[];
};
