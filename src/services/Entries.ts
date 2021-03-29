import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { getRealm } from './Realm';
import { moment } from '../vendors';

import { IEntry } from '../interfaces/entry';
import { ICategory } from '../interfaces/category';

export const getEntries = async (
  days: number,
  category: ICategory,
): Promise<IEntry[]> => {
  const realm = await getRealm();

  const date = moment().subtract(days, 'days').toDate();

  if (!category.id) {
    const entries: IEntry[] = realm
      .objects('Entry')
      .filtered('entryAt >= $0', date)
      .toJSON();

    return entries;
  }
  const entries: IEntry[] = realm
    .objects('Entry')
    .filtered(`entryAt >= $0 && category.id == $1`, date, category.id)
    .toJSON();

  return entries;
};

export const saveEntry = async (entry: IEntry): Promise<IEntry | null> => {
  const realm = await getRealm();

  let entryData = {} as IEntry;

  try {
    realm.write(() => {
      entryData = {
        id: entry.id || uuidv4(),
        amount: entry.amount || 0,
        entryAt: entry.entryAt || new Date(),
        description: entry.description || entry.category.name,
        photo: entry.photo,
        latitude: entry.latitude,
        longitude: entry.longitude,
        address: entry.address,
        category: entry.category,
        isInit: false,
      };

      realm.create(
        'Entry', // Não encontrei a solução, porém esse erro não interfere no funcionamento do app
        entryData,
        true,
      );
    });

    console.log(`saveEntry :: data: ${JSON.stringify(entryData)}`);
    Alert.alert('Lançamento salvo com sucesso.');

    return entryData;
  } catch (err) {
    Alert.alert('Erro ao salvar os dados de lançamento.');
    console.error(
      `saveEntry :: error on save object: ${JSON.stringify(entryData)}\n${err}`,
    );

    return null;
  }
};

export const removeEntry = async (entry: IEntry): Promise<IEntry | null> => {
  const realm = await getRealm();

  try {
    realm.write(() => {
      realm.delete(realm.objectForPrimaryKey('Entry', `${entry.id}`));
    });

    console.log(`removeEntry :: data: ${JSON.stringify(entry)}`);
    Alert.alert('Lançamento deletado com sucesso.');

    return entry;
  } catch (err) {
    Alert.alert('Erro ao deletar lançamento.');
    console.error(
      `saveEntry :: error on delete item: ${JSON.stringify(entry)}\n${err}`,
    );

    return null;
  }
};
