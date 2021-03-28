import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../styles/colors';
import useBalance from '../../hooks/useBalance';

const BalanceLabel: React.FC = () => {
  const { balance } = useBalance();

  return (
    <View
      style={{
        alignItems: 'center',
        padding: 20,
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
          ${balance}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default BalanceLabel;
