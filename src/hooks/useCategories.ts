import { useEffect, useState } from 'react';

import { getCategories } from '../services/Categories';
import { ICategory } from '../interfaces/category';

const useCategories = (): {
  [object: string]: ICategory[];
} => {
  const [categories, setCategories] = useState<{
    [object: string]: ICategory[];
  }>({
    isCredit: [],
    isDebit: [],
    isInit: [],
    allCategories: [],
  });

  useEffect(() => {
    (async () => {
      const promiseCategories = await Promise.resolve([
        getCategories('isCredit'),
        getCategories('isDebit'),
        getCategories('isInit'),
      ]);
      const resolvedCategories: ICategory[][] = await Promise.all(
        promiseCategories,
      );
      setCategories({
        isCredit: resolvedCategories[0],
        isDebit: resolvedCategories[1],
        isInit: resolvedCategories[2],
        all: [
          ...resolvedCategories[0],
          ...resolvedCategories[1],
          ...resolvedCategories[2],
        ],
      });
    })();
  }, []);

  return categories;
};

export default useCategories;
