import React, { useState, useEffect } from 'react';
import { View, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BalanceLabel } from '../../components';
import { Container } from './styles';

import { saveEntry } from '../../services/Entries';

const NewEntry: React.FC = () => {
  const { goBack } = useNavigation();
  const [amount, setAmount] = useState<string>('0');
  const [description, setDescription] = useState<string>('0');

  const currentBalance = 2102.45;

  const save = async () => {
    const entry = {
      amount: parseFloat(amount),
    };

    await saveEntry(entry);
  };

  // useEffect(() => {}, []);

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
        <Button title="Adicionar" onPress={save} />
        <Button title="Cancelar" onPress={() => goBack()} />
      </View>
    </Container>
  );
};

export default NewEntry;
