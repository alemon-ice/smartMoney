import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import Container from '../Core/Container';
import { IEntry } from '../../interfaces/entry';
import { getEntries } from '../../services/Entries';

import EntryListItem from './EntryListItem';
import { IProps } from './types';

const EntryList: React.FC<IProps> = ({ onEntryPress, onPressActionButton }) => {
  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    (async () => {
      const entriesDoc = await getEntries();
      setEntries(entriesDoc);
    })();
  }, []);
  console.log(entries);
  return (
    <Container
      title="Últimos Lançamentos"
      actionLabelText="Últimos 7 dias"
      actionButtonText="Ver mais"
      onPressActionButton={onPressActionButton}
    >
      <FlatList
        data={entries}
        keyExtractor={entry => `${entry.id}`}
        renderItem={({ item: entry, index }) => (
          <EntryListItem
            entry={entry}
            isFirstItem={index === 0}
            isLastItem={index === entries.length - 1}
            onEntryPress={onEntryPress}
          />
        )}
      />
    </Container>
  );
};

export default EntryList;
