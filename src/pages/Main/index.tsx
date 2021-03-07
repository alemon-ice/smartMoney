import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';

import { BalancePanel, EntrySummary, EntryList } from '../../components';
import { IEntry } from '../../interfaces/entry';
import { Container } from './styles';

const Main: React.FC = () => {
  const { navigate } = useNavigation();

  const onNewEntryPress = useCallback(
    (entry: IEntry) => {
      navigate('NewEntry', { entry });
    },
    [navigate],
  );

  const onPressActionButton = useCallback(() => {
    navigate('Report');
  }, [navigate]);

  return (
    <Container>
      <BalancePanel onNewEntryPress={onNewEntryPress} />
      <ScrollView>
        <EntrySummary onPressActionButton={onPressActionButton} />
        <EntryList
          onEntryPress={onNewEntryPress}
          onPressActionButton={onPressActionButton}
        />
      </ScrollView>
    </Container>
  );
};

export default Main;
