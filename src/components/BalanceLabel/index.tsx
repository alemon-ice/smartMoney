import React from 'react';
import { Text, View } from 'react-native';

import { IProps } from './types';

const BalanceLabel: React.FC<IProps> = ({ currentBalance }) => {
  return (
    <View
      style={{
        // flex: 1,
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 12,
        }}
      >
        Saldo Atual
      </Text>
      <Text
        style={{
          fontSize: 18,
        }}
      >
        ${currentBalance}
      </Text>
    </View>
  );
};

export default BalanceLabel;
