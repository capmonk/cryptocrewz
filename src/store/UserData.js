import { useState, useCallback } from 'react';
import { useBetween } from 'use-between';

const useUserData = () => {
  const [account, SetAccount] = useState({
    address: null,
    balance: 0,
    supply: 0,
    whitelisted: false
  });
  const setAccount = useCallback((acc) => {
    SetAccount(acc)
  }, []);
  const [count, SetCount] = useState(0);
  const setCount = useCallback((acc) => {
    SetCount(acc)
  }, []);

  return {
    setAccount,
    account,
    setCount,
    count
  };
};

export const useSharedUserData = () => useBetween(useUserData);