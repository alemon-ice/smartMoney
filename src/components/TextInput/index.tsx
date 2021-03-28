/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TextInput as Input } from 'react-native';

import { colors } from '../../styles/colors';

import { Container, styles } from './styles';
import { IProps } from './types';

const TextInput: React.FC<IProps> = ({ value, onChangeValue, ...rest }) => {
  return (
    <Container>
      <Input
        style={styles.Input}
        value={value}
        onChangeText={onChangeValue}
        placeholderTextColor={colors.champagneDark}
        {...rest}
      />
    </Container>
  );
};

export default TextInput;
