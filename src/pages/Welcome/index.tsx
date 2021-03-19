import React, { useState } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useCategories from '../../hooks/useCategories';
import { saveEntry } from '../../services/Entries';
import { setInialized } from '../../services/Welcome';
import ActionFooter, { ActionButton } from '../../components/Core/ActionFooter';
import { InputMask } from '../../components';
import { colors } from '../../styles/colors';
import Logo from '../../assets/logo-white.png';
import { IEntry } from '../../interfaces/entry';

import { Container } from './styles';

const Welcome: React.FC = () => {
  const { navigate } = useNavigation();
  const { isInit } = useCategories();
  const [amount, setAmount] = useState<string>('0.00');

  async function handleSave() {
    const initialEntry: IEntry = {
      amount: Number(amount),
      description: isInit[0].name,
      entryAt: new Date(),
      isInit: true,
      category: isInit[0],
      latitude: null,
      longitude: null,
      address: null,
      photo: null,
    };

    saveEntry({ currentEntry: initialEntry, newEntryData: initialEntry });

    await setInialized();
    navigate('Main');
  }

  return (
    <Container>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Image source={Logo} />
      </View>
      <View style={{}}>
        <Text
          style={{
            color: colors.white,
            fontSize: 28,
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          Olá
        </Text>
        <Text
          style={{
            color: colors.white,
            fontSize: 18,
            textAlign: 'center',
            marginTop: 10,
            marginBottom: 40,
          }}
        >
          Para começar a usar o Smart Money, você precisa informar o seu saldo
          atual. Vamos lá?
        </Text>
      </View>
      <View>
        <InputMask
          type="money"
          options={{
            precision: 2,
            separator: ',',
            delimiter: '.',
            unit: '',
            suffixUnit: '',
          }}
          onChangeValue={setAmount}
          value={amount}
          debit={1}
          setDebit={debit => debit}
        />
      </View>
      <ActionFooter>
        <ActionButton type="primary" title="Continuar" onPress={handleSave} />
      </ActionFooter>
    </Container>
  );
};

export default Welcome;
