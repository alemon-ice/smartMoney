import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { IEntry } from '../interfaces/entry';
import { getBalanceSumByCategory } from '../services/Balance';

const useBalanceSumByCategory = (days = 7): { balanceSum: IEntry[] } => {
  const [balanceSum, setBalanceSum] = useState<IEntry[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const balanceSumResponse = await getBalanceSumByCategory(days);
        setBalanceSum([...balanceSumResponse]);
      })();
    }, [days]),
  );

  return { balanceSum };
};

export default useBalanceSumByCategory;
