import React from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import BalancePanelChart from '../BalancePanelChart';
import { colors } from '../../styles/colors';
import { defaultInitalEntry } from '../../util/NewEntryValue';
import useBalance from '../../hooks/useBalance';

import { Container, BalancePanelLabel, AddButton } from './styles';
import { IProps } from './types';

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
