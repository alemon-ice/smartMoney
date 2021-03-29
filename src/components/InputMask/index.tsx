/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import {
  checkIfValueIsPositive,
  convertInputMaskValue,
} from '../../util/numberValues';

import { Container, DebitButton, styles } from './styles';
import { IProps } from './types';

const InputMask: React.FC<IProps> = ({
  value,
  changeValue,
  debit,
  setDebit,
  checkCategory,
}) => {
  function onChangeDebitCredit() {
    const updateDebit = checkIfValueIsPositive(debit) ? -1 : 1;
    setDebit(updateDebit);

    if (checkCategory) {
      const { category, changeCategory } = checkCategory;

      if (
        (category && category.entryType === 'isCredit' && updateDebit === -1) ||
        (category && category.entryType === 'isDebit' && updateDebit === 1)
      ) {
        changeCategory(null);
      }
    }
  }

  function onChangeValue(textValue: string) {
    const formattedValue = convertInputMaskValue({
      value: textValue,
      to: 'string',
    });
    changeValue(formattedValue);
  }

  return (
    <Container>
      <TouchableOpacity
        style={styles.DebitButton}
        onPress={onChangeDebitCredit}
      >
        <DebitButton>{!checkIfValueIsPositive(debit) && '-'}</DebitButton>
        <DebitButton>R$</DebitButton>
      </TouchableOpacity>
      <TextInputMask
        type="money"
        options={{
          precision: 2,
          separator: ',',
          delimiter: '.',
          unit: '',
          suffixUnit: '',
        }}
        style={styles.InputMask}
        value={value}
        includeRawValueInChangeText
        onChangeText={onChangeValue}
      />
    </Container>
  );
};

export default InputMask;
