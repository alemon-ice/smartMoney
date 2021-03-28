import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import Container from '../Core/Container';
import useEntries from '../../hooks/useEntries';

import EntryListItem from './EntryListItem';
import { IProps } from './types';

const EntryList: React.FC<IProps> = ({
  days = 7,
  category,
  onEntryPress,
  onPressActionButton,
  refresh,
}) => {
  const [getDays, setDays] = useState(days);

  const { entries } = useEntries(getDays, category);

  useEffect(() => {
    setDays(days);
  }, [refresh]);

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
            onEntryPress={onEntryPress && onEntryPress}
          />
        )}
      />
    </Container>
  );
};

export default EntryList;
