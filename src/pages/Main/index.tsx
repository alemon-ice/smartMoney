import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { BalancePanel, EntrySummary, EntryList } from '../../components';
import { Container } from './styles';
import { IEntry } from '../../interfaces/entry';

const Main: React.FC = () => {
  const { navigate } = useNavigation();
  const entrySummaryData = [
    { key: '1', description: 'Alimentação', amount: 200 },
    { key: '2', description: 'Combustível', amount: 12 },
    { key: '3', description: 'Aluguel', amount: 120 },
    { key: '4', description: 'Lazer', amount: 250 },
    { key: '5', description: 'Outros', amount: 1200 },
  ];

  const onNewEntryPress = useCallback(
    (entry: IEntry) => {
      navigate('NewEntry', { entry });
    },
    [navigate],
  );

  return (
    <Container>
      <BalancePanel onNewEntryPress={onNewEntryPress} />
      <EntrySummary entries={entrySummaryData} />
      <EntryList />
    </Container>
  );
};

export default Main;
