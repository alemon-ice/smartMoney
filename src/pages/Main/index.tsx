import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BalancePanel, EntrySummary, EntryList } from '../../components';
import { Container } from './styles';

const Main: React.FC = () => {
  const { navigate } = useNavigation();
  const currentBalance = 2102.45;
  const entryListData = [
    { key: '1', description: 'Padaria Asa Branca', amount: 10 },
    { key: '2', description: 'Supermercado Isadora', amount: 190 },
    { key: '3', description: 'Posto Ipiranga', amount: 190 },
  ];
  const entrySummaryData = [
    { key: '1', description: 'Alimentação', amount: 200 },
    { key: '2', description: 'Combustível', amount: 12 },
    { key: '3', description: 'Aluguel', amount: 120 },
    { key: '4', description: 'Lazer', amount: 250 },
    { key: '5', description: 'Outros', amount: 1200 },
  ];

  return (
    <Container>
      <BalancePanel currentBalance={currentBalance} />
      <Button title="Adicionar" onPress={() => navigate('NewEntry')} />
      <EntrySummary entries={entrySummaryData} />
      <EntryList entries={entryListData} />
    </Container>
  );
};

export default Main;
