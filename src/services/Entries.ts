import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { getRealm } from './Realm';

import { IEntry } from '../interfaces/entry';

interface ISaveEntryProps {
  currentEntry: IEntry;
  newEntryData: IEntry;
}

export const getEntries = async (): Promise<IEntry[]> => {
  const realm = await getRealm();

  const entries: IEntry[] = realm.objects('Entry').toJSON();

  return entries;
};

export const saveEntry = async ({
  currentEntry,
  newEntryData,
}: ISaveEntryProps): Promise<IEntry | null> => {
  const realm = await getRealm();

  let entryData = {} as IEntry;

  try {
    realm.write(() => {
      entryData = {
        id: newEntryData.id || currentEntry.id || uuidv4(),
        amount: newEntryData.amount || currentEntry.amount,
        entryAt: newEntryData.entryAt || currentEntry.entryAt || new Date(),
        description: newEntryData.description || currentEntry.description,
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
