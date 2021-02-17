import React from 'react';
import { Text, View } from 'react-native';

import { BalancePanelLabel, BalancePanelChart } from './styles';

import { IProps } from './types';

const BalancePanel: React.FC<IProps> = ({ currentBalance }) => {
  return (
    <View>
      <BalancePanelLabel>
        <Text style={{ fontSize: 18 }}>Saldo atual</Text>
        <Text style={{ fontSize: 22 }}>${currentBalance}</Text>
      </BalancePanelLabel>
      <BalancePanelChart />
    </View>
  );
};

export default BalancePanel;
