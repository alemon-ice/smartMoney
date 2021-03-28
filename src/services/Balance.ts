import { format } from 'date-fns';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { getRealm } from './Realm';
import { moment } from '../vendors';
import { IEntry } from '../interfaces/entry';
import { colors } from '../styles/colors';

export const getBalance = async (untilDays = 0): Promise<number> => {
  const realm = await getRealm();

  let entries = realm.objects('Entry');

  if (untilDays > 0) {
    const date = moment().subtract(untilDays, 'days').toDate();
    entries = entries.filtered('entryAt < $0', date);
  }

  return entries.sum('amount') || 0;
};

export const getBalanceSumByDate = async (days: number): Promise<number[]> => {
  const realm = await getRealm();

  const startBalance = await getBalance(days);

  let entriesQuery = realm.objects('Entry');

  if (days > 0) {
    const date = moment().subtract(days, 'days').toDate();
    entriesQuery = entriesQuery.filtered('entryAt >= $0', date);
  }

  entriesQuery = entriesQuery.sorted('entryAt');

  const entriesDoc: IEntry[] = entriesQuery.toJSON();

  const entries = _(entriesDoc)
    .groupBy(({ entryAt }) => moment(entryAt).format('YYYYMMDD'))
    .map(entry => _.sumBy(entry, 'amount'))
    .map(
      (amount, index, collection) =>
        (index === 0 ? startBalance : 0) +
        _.sum(_.slice(collection, 0, index)) +
        amount,
    )
    .toJSON();

  return entries;
};

export const getBalanceSumByCategory = async (
  days: number,
  showOthers = true,
): Promise<IEntry[]> => {
  const realm = await getRealm();

  let entriesQuery = realm.objects('Entry');

  if (days > 0) {
    const date = moment().subtract(days, 'days').toDate();
    entriesQuery = entriesQuery.filtered('entryAt >= $0', date);
  }

  const entriesDoc: IEntry[] = entriesQuery.toJSON();

  const entries = _(entriesDoc)
    .groupBy(({ category: { id } }) => id)
    .map(entry => ({
      ...entry[0],
      amount: Math.abs(Number(entry[0].amount)),
    }))
    .orderBy('amount', 'desc')
    .toJSON();

  const othersLimit = 3;

  if (showOthers && _(entries).size() > othersLimit) {
    const categories = _(entries).slice(0, othersLimit).toJSON();
    const categoryOthers = [
      {
        category: {
          id: uuidv4(),
          name: 'Outros',
          color: colors.metal,
        },
        amount: _(entries)
          .slice(othersLimit)
          .map(({ amount }) => amount)
          .sum(),
      },
    ];

    return [...categories, ...categoryOthers] as IEntry[];
  }

  return entries;
};
