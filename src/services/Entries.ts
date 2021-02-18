import { Alert } from 'react-native';
import { getRealm } from './Realm';

export const saveEntry = async ({ amount }: { amount: number }) => {
  const realm = await getRealm();

  let data = {};

  try {
    realm.write(() => {
      data = {
        id: '123',
        amount,
        entryAt: new Date(),
        isInit: false,
      };

      realm.create(
        'Entry', // Não encontrei a solução, porém esse erro não interfere no funcionamento do app
        data,
        true,
      );
    });

    console.log(`saveEntry :: data: ${JSON.stringify(data)}`);

    return data;
  } catch (err) {
    console.error(`saveEntry :: error on save object: ${JSON.stringify(data)}`);
    Alert.alert('Erro ao salvar os dados de lançamento.');
  }
};
