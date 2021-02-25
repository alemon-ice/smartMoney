import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { BalancePanel, EntrySummary, EntryList } from '../../components';
import { Container } from './styles';
import { IEntry } from '../../interfaces/entry';

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
      <EntrySummary onPressActionButton={onPressActionButton} />
      <EntryList
        onEntryPress={onNewEntryPress}
        onPressActionButton={onPressActionButton}
      />
    </Container>
  );
};

export default Main;
