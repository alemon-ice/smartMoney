import React from 'react';
import { BarChart } from 'react-native-svg-charts';

import useBalanceSum from '../../hooks/useBalanceSumByDate';

import { Container } from './styles';

const BalancePanelChart: React.FC = () => {
  const { balanceSum } = useBalanceSum();
  return (
    <Container>
      <BarChart
        style={{
          height: 40,
        }}
        data={balanceSum}
        svg={{
          fill: 'rgba(0, 0, 0, .1)',
          stroke: 'rgba(0, 0, 0, .1)',
          strokeWidth: 1,
        }}
        contentInset={{ top: 0, bottom: 0 }}
      />
    </Container>
  );
};

export default BalancePanelChart;
