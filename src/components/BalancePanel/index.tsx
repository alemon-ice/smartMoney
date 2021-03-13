import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BalancePanelChart from '../BalancePanelChart';
import { colors } from '../../styles/colors';
import { IEntry } from '../../interfaces/entry';
import { ICategory } from '../../interfaces/category';
import useBalance from '../../hooks/useBalance';

import { Container, BalancePanelLabel, AddButton } from './styles';
import { IProps } from './types';

const defaultInitalEntry: IEntry = {
  id: null,
  amount: '0.00',
  description: '',
  entryAt: new Date(),
  category: {
    id: '',
    name: 'Selecionar categoria',
  } as ICategory,
};

const BalancePanel: React.FC<IProps> = ({ onNewEntryPress }) => {
  const { balance } = useBalance();

  return (
    <Container>
      <LinearGradient
        colors={[colors.violet, colors.blue]}
        // style={{ paddingVertical: 10 }}
      >
        <BalancePanelLabel>
          <Text style={{ fontSize: 14, color: colors.white }}>Saldo atual</Text>
          <Text style={{ fontSize: 36, color: colors.white }}>${balance}</Text>
        </BalancePanelLabel>
        <BalancePanelChart />
      </LinearGradient>
      <AddButton
        style={{
          shadowColor: colors.black,
          elevation: 5,
        }}
        onPress={() => onNewEntryPress(defaultInitalEntry)}
      >
        <Icon name="add" size={30} color="#fff" />
      </AddButton>
    </Container>
  );
};

export default BalancePanel;
