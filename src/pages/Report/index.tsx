import React from 'react';
import { View, Picker, Button } from 'react-native';

import { BalanceLabel, EntrySummary, EntryList } from '../../components';
import { Container } from './styles';

const Report: React.FC = () => {
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
      <BalanceLabel currentBalance={currentBalance} />

      <View>
        <Picker>
          <Picker.Item label="Todas as Categorias" />
        </Picker>
        <Picker>
          <Picker.Item label="Últimos 7 dias" />
        </Picker>
      </View>

      <EntrySummary entries={entrySummaryData} />
      <EntryList entries={entryListData} />

      <View>
        <Button title="Salvar" onPress={() => console.log('button press')} />
        <Button title="Fechar" onPress={() => console.log('button press')} />
      </View>
    </Container>
  );
};

export default Report;
