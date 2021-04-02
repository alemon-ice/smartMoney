import Realm from 'realm';
import { Alert } from 'react-native';
// import { cleanInialized } from './Welcome';

import CategorySchema from '../schemas/CategorySchema';
import EntrySchema from '../schemas/EntrySchema';
import { getDefaultCategories } from './Categories';

export const getRealm = async (): Promise<Realm> => {
  const realm = await Realm.open({
    schema: [CategorySchema, EntrySchema],
    schemaVersion: 6,
  });

  initDB(realm);
  // dropDB(realm);
  // cleanInialized();

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

const dropDB = (realm: Realm): void => {
  console.log(`dropDB :: dropping db...`);
  realm.write(() => {
    realm.deleteAll();
  });
};

export const clearDB = async (): Promise<void> => {
  const realm = await getRealm();
  console.log(`dropDB :: dropping db...`);
  realm.write(() => {
    realm.deleteAll();
  });
};
