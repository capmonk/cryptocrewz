import { useState, useCallback } from 'react';
import { useBetween } from 'use-between';

const useContractData = () => {
  const [contractData, SetContractData] = useState({
    price : 0,
    totalSupply: 0,
    maxSupply: 0,
    name: "",
    maxPresale: 0,
    maxPerWallet: 0,
    maxMainsale: 0,
    publicSaleIsActive: false,
    preSaleIsActive: false,
    address: 0,
    symbol: ""
  });
  const setContractData = useCallback((data) => SetContractData(c => data), []);
  const [whitelisted, SetWhitelisted] = useState([]);
  const setWhitelisted = useCallback((data) => SetWhitelisted(c => data), []);
  return {
    contractData,
    setContractData,
    whitelisted,
    setWhitelisted
  };
};

export const useSharedContractData = () => useBetween(useContractData);