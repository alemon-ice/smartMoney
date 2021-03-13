import React from 'react';

import { Container, Chart } from './styles';
import { IProps } from './types';

const EntrySummaryChart: React.FC<IProps> = ({ data }) => {
  const chartData = data
    .filter(entry => entry.amount > 0)
    .map(({ amount, category }) => ({
      key: `${category.id}`,
      value: Number(amount),
      svg: {
        fill: category.color,
      },
    }));

  return (
    <Container>
      <Chart data={chartData} />
    </Container>
  );
};

export default EntrySummaryChart;
