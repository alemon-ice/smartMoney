import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import Container from '../Core/Container';
import { IEntry } from '../../interfaces/entry';
import { getEntries } from '../../services/Entries';

import EntryListItem from './EntryListItem';
import { IProps } from './types';

const EntryList: React.FC<IProps> = ({
  days = 7,
  category,
  onEntryPress,
  onPressActionButton,
}) => {
  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    (async () => {
      const entriesDoc = await getEntries(days, category);
      setEntries(entriesDoc);
    })();
  }, [days, category]);

  return (
    <Container
      title="Últimos Lançamentos"
      actionLabelText={`Últimos ${days} dias`}
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
