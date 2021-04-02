import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { getBalanceSumByDate } from '../services/Balance';

const useBalanceSumByDate = (days = 7): { balanceSum: number[] } => {
  const [balanceSum, setBalanceSum] = useState<number[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const balanceSumResponse = await getBalanceSumByDate(days);
        setBalanceSum([...balanceSumResponse]);
      })();
    }, [days]),
  );

  return { balanceSum };
};

export default useBalanceSumByDate;
