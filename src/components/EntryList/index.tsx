import React from 'react';
import { FlatList, Text, View } from 'react-native';

// import { EntryListItem } from './styles';

import { IProps } from './types';

const EntryList: React.FC<IProps> = ({ entries }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        Últimos Lançamentos
      </Text>
      <FlatList
        data={entries}
        renderItem={({ item }) => (
          <Text>
            - {item.description} - ${item.amount}
          </Text>
        )}
      />
      {/* <EntryListItem>
        <Text>EntryListItem</Text>
      </EntryListItem> */}
    </View>
  );
};

export default EntryList;
