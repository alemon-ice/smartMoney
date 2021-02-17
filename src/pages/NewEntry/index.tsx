import React from 'react';
import { View, Button, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BalanceLabel } from '../../components';
import { Container } from './styles';

const NewEntry: React.FC = () => {
  const { goBack } = useNavigation();
  const currentBalance = 2102.45;

  return (
    <Container>
      <BalanceLabel currentBalance={currentBalance} />

      <View>
        <TextInput
          style={{
            borderColor: '#000',
            borderWidth: 1,
          }}
        />
        <TextInput
          style={{
            borderColor: '#000',
            borderWidth: 1,
          }}
        />
        <Button title="GPS" onPress={() => console.log('button press')} />
        <Button title="Câmera" onPress={() => console.log('button press')} />
      </View>
      <View>
        <Button title="Adicionar" onPress={() => console.log('button press')} />
        <Button title="Cancelar" onPress={() => goBack()} />
      </View>
    </Container>
  );
};

export default NewEntry;
