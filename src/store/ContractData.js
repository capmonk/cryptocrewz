import { useState, useCallback } from 'react';
import { useBetween } from 'use-between';

const useContractData = () => {
  const [contractData, SetContractData] = useState({
    price : 0,
    totalSupply: 0,
    maxSupply: 0,
    name: 0,
    maxPresale: 0,
    maxPerWallet: 0,
    maxMainsale: 0,
    publicSaleIsActive: false,
    preSaleIsActive: false,
    address: 0
  });
  const setContractData = useCallback((data) => SetContractData(c => data), []);
  return {
    contractData,
    setContractData
  };
};

export const useSharedContractData = () => useBetween(useContractData);