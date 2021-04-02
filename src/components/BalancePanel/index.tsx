import React from 'react';
import { Text, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BalancePanelChart from '../BalancePanelChart';
import { colors } from '../../styles/colors';
import { defaultInitalEntry } from '../../util/NewEntryValue';
import useBalance from '../../hooks/useBalance';
import Currency from '../Core/Currency';
import { cleanInialized } from '../../services/Welcome';
import { clearDB } from '../../services/Realm';

import { Container, BalancePanelLabel, AddButton } from './styles';
import { IProps } from './types';

const BalancePanel: React.FC<IProps> = ({ onNewEntryPress }) => {
  const { balance } = useBalance();

  async function handleResetApp() {
    Alert.alert(
      'Resetar app?',
      'Você deseja realmente resetar o app?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await clearDB();
            await cleanInialized();
          },
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <Container>
      <LinearGradient colors={[colors.violet, colors.blue]}>
        <BalancePanelLabel>
          <Text style={{ fontSize: 14, color: colors.white }}>Saldo atual</Text>
          <Text style={{ fontSize: 36, color: colors.white }}>
            <Currency value={balance.toString()} />
          </Text>
        </BalancePanelLabel>
        <BalancePanelChart />
      </LinearGradient>
      <AddButton
        style={{
          shadowColor: colors.black,
          elevation: 5,
        }}
        onPress={() => onNewEntryPress(defaultInitalEntry)}
        onLongPress={handleResetApp}
      >
        <Icon name="add" size={30} color="#fff" />
      </AddButton>
    </Container>
  );
};

export default BalancePanel;
