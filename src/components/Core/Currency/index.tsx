import React from 'react';
import { Text } from 'react-native';
import NumberFormat from 'react-number-format';

import { IProps } from './types';

const Currency: React.FC<IProps> = ({ value }) => {
  return (
    <NumberFormat
      value={parseFloat(value)}
      displayType="text"
      thousandSeparator="."
      decimalSeparator=","
      fixedDecimalScale
      decimalScale={2}
      prefix="R$"
      renderText={item => <Text>{item}</Text>}
    />
  );
};

export default Currency;
