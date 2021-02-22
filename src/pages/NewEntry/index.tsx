import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { BalanceLabel } from '../../components';
import { Container } from './styles';
import { IProps } from './types';

import { saveEntry, removeEntry } from '../../services/Entries';
import { IEntry } from '../../interfaces/entry';

const NewEntry: React.FC<IProps> = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { entry } = params as IProps;

  const [amount, setAmount] = useState<string>(`${entry.amount}`);
  const [description, setDescription] = useState<string>(entry.description);

  const currentBalance = 2102.45;

  function isValidForm() {
    if (parseFloat(amount) !== 0) return true;

    return false;
  }

  async function handleSave() {
    const newEntry: IEntry = {
      amount: Number(amount),
      description,
      entryAt: entry.entryAt,
    };

    await saveEntry({ currentEntry: entry, newEntryData: newEntry });

    goBack();
  }

  async function handleRemove() {
    await removeEntry(entry);
    goBack();
  }

  return (
    <Container>
      <BalanceLabel currentBalance={currentBalance} />

      <View>
        <TextInput
          style={{
            borderColor: '#000',
            borderWidth: 1,
          }}
          onChangeText={value => setAmount(value)}
          value={amount}
        />
        <TextInput
          style={{
            borderColor: '#000',
            borderWidth: 1,
          }}
          onChangeText={value => setDescription(value)}
          value={description}
        />
        <Button title="GPS" onPress={() => console.log('button press')} />
        <Button title="Câmera" onPress={() => console.log('button press')} />
      </View>
      <View>
        <Button
          title="Adicionar"
          onPress={() => isValidForm() && handleSave()}
        />
        <Button title="Excluir" onPress={handleRemove} />
        <Button title="Cancelar" onPress={goBack} />
      </View>
    </Container>
  );
};

export default NewEntry;
