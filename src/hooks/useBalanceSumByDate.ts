import { useEffect, useState } from 'react';

import { IEntry } from '../interfaces/entry';
import { getBalanceSumByDate } from '../services/Balance';

const useBalanceSumByDate = (days = 7): { balanceSum: IEntry[] } => {
  const [balanceSum, setBalanceSum] = useState<IEntry[]>([]);

  useEffect(() => {
    (async () => {
      const balanceSumResponse = await getBalanceSumByDate(days);
      setBalanceSum([...balanceSumResponse]);
    })();
  }, [days]);

  return { balanceSum };
};

export default useBalanceSumByDate;
