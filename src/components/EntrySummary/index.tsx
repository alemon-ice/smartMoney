import React from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Container from '../Core/Container';

import { EntrySummaryChart, EntrySummaryList } from './styles';

const EntrySummary: React.FC = () => {
  const entries = [
    { key: '1', description: 'Alimentação', amount: 200 },
    { key: '2', description: 'Combustível', amount: 12 },
    { key: '3', description: 'Aluguel', amount: 120 },
    { key: '4', description: 'Lazer', amount: 250 },
    { key: '5', description: 'Outros', amount: 1200 },
  ];

  return (
    <Container
      title="Categorias"
      actionLabelText="Últimos 7 dias"
      actionButtonText="Ver mais"
      onPressActionButton={() => console.log('press action button')}
    >
      <EntrySummaryChart />
      <EntrySummaryList>
        <FlatList
          data={entries}
          renderItem={({ item }) => (
            <Text>
              - {item.description} - ${item.amount}
            </Text>
          )}
        />
      </EntrySummaryList>
    </Container>
  );
};

export default EntrySummary;
