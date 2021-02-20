import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { IEntry } from '../../interfaces/entry';

import { getEntries } from '../../services/Entries';

// import { EntryListItem } from './styles';

const EntryList: React.FC = () => {
  const { navigate } = useNavigation();

  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    (async () => {
      const entriesDoc = await getEntries();
      setEntries(entriesDoc);
    })();
  }, []);

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
          <View>
            <Text>
              - {item.description} - ${item.amount}
            </Text>
            <Button
              title={`${item.id}`}
              onPress={() => navigate('NewEntry', { entry: item })}
            />
          </View>
        )}
      />
      {/* <EntryListItem>
        <Text>EntryListItem</Text>
      </EntryListItem> */}
    </View>
  );
};

export default EntryList;
