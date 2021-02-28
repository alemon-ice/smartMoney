import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { colors } from '../../../styles/colors';

// import { Container } from './styles';

const ActionFooter: React.FC = ({ children }) => {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingVertical: 10,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {children}
      </View>
    </View>
  );
};

export const ActionButton: React.FC<{
  type?: 'primary' | 'secondary';
  title: string;
  onPress(): void;
}> = ({ type = 'secondary', title, onPress }) => {
  const primaryButtonStyle = {
    borderRadius: 150,
    borderWidth: 1.5,
    borderColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 20,
  };

  return (
    <TouchableOpacity
      style={
        type === 'primary'
          ? primaryButtonStyle
          : {
              paddingVertical: 10,
              paddingHorizontal: 20,
            }
      }
      onPress={onPress}
    >
      <Text
        style={{
          fontSize: 18,
          textAlign: 'center',
          color: type === 'primary' ? colors.green : colors.white,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ActionFooter;
