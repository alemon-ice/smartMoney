import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { getBalance } from '../services/Balance';

const useBalance = (): { balance: number } => {
  const navigation = useNavigation();

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    (() => {
      navigation.addListener('focus', async () => {
        const balanceSum = await getBalance();
        setBalance(balanceSum);
      });
    })();
  }, [navigation]);

  return { balance };
};

export default useBalance;
