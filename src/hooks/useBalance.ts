import { useEffect, useState } from 'react';

import { getBalance } from '../services/Balance';

const useBalance = (): { balance: number } => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const balanceSum = await getBalance();
      setBalance(balanceSum);
    })();
  }, []);

  return { balance };
};

export default useBalance;
