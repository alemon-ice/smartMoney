import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../styles/colors';

// import { IProps } from './types';

const BalanceLabel: React.FC = () => {
  const currentBalance = 2102.45;
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
          color: colors.white,
        }}
      >
        Saldo Atual
      </Text>
      <LinearGradient
        style={{
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginVertical: 10,
        }}
        colors={[colors.violet, colors.blue]}
      >
        <Text
          style={{
            fontSize: 28,
            color: colors.white,
          }}
        >
          ${currentBalance}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default BalanceLabel;
