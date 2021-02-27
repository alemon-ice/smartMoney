import Realm from 'realm';
import { Alert } from 'react-native';

import CategorySchema from '../schemas/CategorySchema';
import EntrySchema from '../schemas/EntrySchema';
import { getDefaultCategories } from './Categories';

export const getRealm = async (): Promise<Realm> => {
  const realm = await Realm.open({
    schema: [CategorySchema, EntrySchema],
    schemaVersion: 2,
  });

  initDB(realm);

  return realm;
};

export const initDB = (realm: Realm): void => {
  const categoriesCount = realm.objects('Category').length;

  if (categoriesCount === 0) {
    try {
      const categories = getDefaultCategories();

      realm.write(() => {
        categories.forEach(category =>
          realm.create('Category', category, true),
        );
      });
    } catch (err) {
      Alert.alert('Erro ao iniciar database.');
      console.error(`initDB :: error on init Database:\n${err}`);
    }
  }
};
