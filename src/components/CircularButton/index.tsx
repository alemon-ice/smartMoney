import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../styles/colors';

import { IProps } from './types';

const CircularButton: React.FC<IProps> = ({
  icon,
  color,
  onPressAction,
  children,
}) => {
  return (
    <View
      style={{
        marginHorizontal: 10,
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: color,
          width: 59,
          height: 59,
          borderRadius: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPressAction}
      >
        <Icon name={icon} size={30} color={colors.white} />
      </TouchableOpacity>
      {children && children}
    </View>
  );
};

export default CircularButton;
