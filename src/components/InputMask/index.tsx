/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import { colors } from '../../styles/colors';
import { checkIfValueIsPositive } from '../../util/checkNumber';

import { Container, DebitButton } from './styles';
import { IProps } from './types';

const InputMask: React.FC<IProps> = ({
  value,
  onChangeValue,
  debit,
  setDebit,
  ...rest
}) => {
  const onChangeDebitCredit = () => {
    const updateDebit = checkIfValueIsPositive(debit) ? -1 : 1;
    setDebit(updateDebit);
  };

  return (
    <Container>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: 20,
        }}
        onPress={onChangeDebitCredit}
      >
        <DebitButton>{!checkIfValueIsPositive(debit) && '-'}</DebitButton>
        <DebitButton>R$</DebitButton>
      </TouchableOpacity>
      <TextInputMask
        style={{
          flex: 1,
          fontSize: 28,
          color: colors.white,
          textAlign: 'right',
          paddingRight: 20,
        }}
        value={value}
        includeRawValueInChangeText
        onChangeText={(_, rawValue) => onChangeValue(`${rawValue}`)}
        {...rest}
      />
    </Container>
  );
};

export default InputMask;
