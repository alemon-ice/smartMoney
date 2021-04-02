import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { getEntries, saveEntry, removeEntry } from '../services/Entries';
import { IEntry } from '../interfaces/entry';
import { nullCategoryValue } from '../util/NewEntryValue';

const useEntries = (
  days = 7,
  category = nullCategoryValue,
): {
  entries: IEntry[];
  saveEntry: typeof saveEntry;
  removeEntry: typeof removeEntry;
} => {
  const [entries, setEntries] = useState<IEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const entriesResponse = await getEntries(days, category);
        setEntries(entriesResponse);
      })();
    }, [days, category]),
  );

  return { entries, saveEntry, removeEntry };
};

export default useEntries;
