import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { EntrySummaryChart, EntrySummaryList } from './styles';
import { IProps } from './types';

const EntrySummary: React.FC<IProps> = ({ entries }) => {
  return (
    <View>
      <EntrySummaryChart />
      <EntrySummaryList>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          Categorias
        </Text>
        <FlatList
          data={entries}
          renderItem={({ item }) => (
            <Text>
              - {item.description} - ${item.amount}
            </Text>
          )}
        />
      </EntrySummaryList>
    </View>
  );
};

export default EntrySummary;
