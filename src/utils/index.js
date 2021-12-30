import Web3 from "web3";
import Web3Modal, { getProviderInfo } from "@venly/web3modal";
import ContractAbi from '../contract/abi.json';
import keccak256 from "keccak256";
import { ethers } from "ethers";
import MerkleTree from "merkletreejs";

export async function GetContractData () {
  const web3temp = new Web3(new Web3.providers.HttpProvider('https://matic-mumbai.chainstacklabs.com'));
  const contract = new web3temp.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
  return { 
    price : Web3.utils.fromWei(await contract.methods.tokenPrice.call().call()),
    totalSupply: await contract.methods.totalSupply.call().call(),
    maxSupply: await contract.methods.MAX_SUPPLY.call().call(),
    name: await contract.methods.name.call().call(),
    maxPresale: await contract.methods.maxPresale.call().call(),
    maxPerWallet: await contract.methods.maxPerWallet.call().call(),
    maxMainsale: await contract.methods.maxMainSale.call().call(),
    publicSaleIsActive: await contract.methods.publicSaleIsActive.call().call(),
    preSaleIsActive: await contract.methods.preSaleIsActive.call().call(),
    symbol: await contract.methods.symbol.call().call(),
    address: process.env.REACT_APP_CONTRACT_ADDRESS
  }
}

export async function Init() {
  
  const Venly = window.Venly;

  const providerOptions = {
    venly: {
      package: Venly,
      options: {
        clientId: "Testaccount",
        environment: "staging"
      }
    }
  };
  window.web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    theme: {
      background: "rgb(20, 20, 20)",
      main: "rgb(199, 199, 199)",
      secondary: "rgb(136, 136, 136)",
      border: "3px rgba(195, 195, 195, 0.14)",
      hover: "rgb(16, 26, 32)"
    }
  });
}

export async function ConnectWallet () {
    try {
      let provider = await window.web3Modal.connect();
      window.web3 = new Web3(provider);
      const providerName = getProviderInfo(provider).name;
      if (providerName === "MetaMask") {
        await window.web3.currentProvider.request({
          method: 'wallet_addEthereumChain',
          params: [{ chainId: '0x13881', rpcUrls: ['https://matic-mumbai.chainstacklabs.com'], chainName: "Polygon Testnet Mumbai" ,blockExplorerUrls: ["https://mumbai.polygonscan.com/"], nativeCurrency: { name: "MATIC", decimals: 18, symbol: "MATIC" }}],
        });
      } 
      if (providerName === "Web3") {
        provider = await window.Venly.changeSecretType('MATIC')
        window.web3 = new Web3(provider);
      }
      const contract = new window.web3.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
      const accounts = await window.web3.eth.getAccounts()
      const supply = await contract.methods.balanceOf(accounts[0]).call()
      const balance = Web3.utils.fromWei( await window.web3.eth.getBalance(accounts[0]))
      return { provider, account: {address: accounts[0], supply, balance }}
    } catch(e) {
      console.log("Could not get a wallet connection", e);
      return null;
  }
}

export async function FetchUserData () {
  const contract = new window.web3.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
  const accounts = await window.web3.eth.getAccounts()
  const supply = await contract.methods.balanceOf(accounts[0]).call()
  const balance = Web3.utils.fromWei( await window.web3.eth.getBalance(accounts[0]))
  return {address: accounts[0], supply, balance }
}

export async function DisconnectWallet () {
    if (window.web3) {
      const provider = window.web3.currentProvider
      if(provider.disconnect) {
        await provider.disconnect();
        await window.web3Modal.clearCachedProvider();
      }
    }
}

export async function GetUserData () {
  if (window.web3) {
    const provider = window.web3.currentProvider
    if(provider.disconnect) {
      await provider.disconnect();
      await window.web3Modal.clearCachedProvider();
    }
  }
}

export async function MintPublicSale (count) {
  const contract = new window.web3.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
  const from = (await window.web3.eth.getAccounts())[0]
  const value = count * await contract.methods.tokenPrice.call().call();
  await contract.methods.mint(count).send({from, value});
}

function hashToken(address) {
  return ethers.utils.solidityKeccak256(["address"], [address]).slice(2);
}

export async function MintPreSale (count, whitelisted) {
  console.log(whitelisted)
  const from = (await window.web3.eth.getAccounts())[0]
  const tree = new MerkleTree(whitelisted.map(token => keccak256(token)),keccak256,{ sortPairs: true });
  const proof = tree.getHexProof(hashToken(from));
  console.log(tree.getHexRoot())
  console.log(proof)
  const contract = new window.web3.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
  const value = count * await contract.methods.tokenPrice.call().call();
  await contract.methods.whitelistedMints(proof, count).send({from, value});
}

export const GetMaxCount = (acc, contractData) => {
  let maxCount = contractData.maxMainsale;
  if (contractData.preSaleIsActive && !contractData.publicSaleIsActive) {
    maxCount = contractData.maxPresale - acc.supply
  }
  if (contractData.publicSaleIsActive) {
    maxCount = contractData.maxMainsale - acc.supply
  }
  return maxCount
}