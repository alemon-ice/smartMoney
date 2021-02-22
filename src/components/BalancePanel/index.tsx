import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../styles/colors';
import { IEntry } from '../../interfaces/entry';

import { BalancePanelLabel, BalancePanelChart, AddButton } from './styles';
import { IProps } from './types';

const defaultInitalEntry: IEntry = {
  id: null,
  amount: '0.00',
  description: '',
  entryAt: new Date(),
};

const BalancePanel: React.FC<IProps> = ({ onNewEntryPress }) => {
  const currentBalance = 2102.45;
  return (
    <View>
      <LinearGradient
        colors={[colors.violet, colors.blue]}
        style={{ paddingVertical: 10 }}
      >
        <BalancePanelLabel>
          <Text style={{ fontSize: 14, color: colors.white }}>Saldo atual</Text>
          <Text style={{ fontSize: 36, color: colors.white }}>
            ${currentBalance}
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
      >
        <Icon name="add" size={30} color="#fff" />
      </AddButton>
    </View>
  );
};

export default BalancePanel;
