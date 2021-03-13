import { useEffect, useState } from 'react';

import { IEntry } from '../interfaces/entry';
import { getBalanceSumByCategory } from '../services/Balance';

const useBalanceSumByCategory = (days = 7): { balanceSum: IEntry[] } => {
  const [balanceSum, setBalanceSum] = useState<IEntry[]>([]);

  useEffect(() => {
    (async () => {
      const balanceSumResponse = await getBalanceSumByCategory(days);
      setBalanceSum([...balanceSumResponse]);
    })();
  }, [days]);

  return { balanceSum };
};

export default useBalanceSumByCategory;
