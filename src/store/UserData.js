import { useState, useCallback } from 'react';
import { useBetween } from 'use-between';

const useUserData = () => {
  const [account, SetAccount] = useState({
    address: null,
    provider: "",
    balance: 0,
    supply: 0,
    whitelisted: false,
    type: "",
    email: "",
    isWhitelisted: false,
    isPresale: false
  });
  const setAccount = useCallback((acc) => {
    SetAccount(acc)
  }, []);
  const [count, SetCount] = useState(0);
  const setCount = useCallback((acc) => {
    SetCount(Math.max(acc, 0))
  }, []);

  const [email, SetEmail] = useState("")
  const [code, SetCode] = useState("")
  
  const setEmail = useCallback((acc) => {
    SetEmail(acc)
  }, []);
  const setCode = useCallback((acc) => {
    SetCode(acc)
  }, []);
  return {
    setAccount,
    account,
    setCount,
    count,
    setEmail,
    email,
    setCode,
    code
  };
};

export const useSharedUserData = () => useBetween(useUserData);