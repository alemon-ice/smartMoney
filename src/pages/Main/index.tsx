import React, { useCallback, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { BalancePanel, EntrySummary, EntryList } from '../../components';
import { IEntry } from '../../interfaces/entry';
import { Container } from './styles';

const Main: React.FC = () => {
  const { navigate } = useNavigation();

  const [refresh, setRefresh] = useState(false);
  const [trigger, setTrigger] = useState(Math.random());

  const onNewEntryPress = useCallback(
    (entry: IEntry) => {
      navigate('NewEntry', { currentEntry: entry });
    },
    [navigate],
  );

  const onPressActionButton = useCallback(() => {
    navigate('Report');
  }, [navigate]);

  function onRefresh() {
    setRefresh(true);

    setTimeout(() => {
      setTrigger(Math.random());
    }, 300);
    setRefresh(false);
  }

  return (
    <Container>
      <BalancePanel onNewEntryPress={onNewEntryPress} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        <EntrySummary
          onPressActionButton={onPressActionButton}
          refresh={trigger}
        />
        <EntryList
          onEntryPress={onNewEntryPress}
          onPressActionButton={onPressActionButton}
          refresh={trigger}
        />
      </ScrollView>
    </Container>
  );
};

export default Main;
