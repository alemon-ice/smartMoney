import { useEffect, useState } from 'react';

import { getEntries, saveEntry, removeEntry } from '../services/Entries';
import { IEntry } from '../interfaces/entry';
import { ICategory } from '../interfaces/category';

const useEntries = (
  days = 7,
  category?: ICategory,
): {
  entries: IEntry[];
  saveEntry: typeof saveEntry;
  removeEntry: typeof removeEntry;
} => {
  const [entries, setEntries] = useState<IEntry[]>([]);

  useEffect(() => {
    (async () => {
      const entriesResponse = await getEntries(days, category);
      setEntries(entriesResponse);
    })();
  }, [days, category]);

  return { entries, saveEntry, removeEntry };
};

export default useEntries;
