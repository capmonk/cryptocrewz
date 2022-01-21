import Web3 from "web3";
// import Web3Modal, { getProviderInfo } from "@venly/web3modal";
import ContractAbi from '../contract/abi.json';
// import keccak256 from "keccak256";
// import { ethers } from "ethers";
// import MerkleTree from "merkletreejs";
// import Venly from '@venly/web3-provider'

export async function GetContractData () {
  const web3temp = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_HTTPPROVIDER));
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
  let options = {
    clientId: process.env.REACT_APP_VENLY_USERNAME,
    environment: (process.env.REACT_APP_VENLY_USERNAME === "Testaccount" ? "staging" : "production"),
    secretType: process.env.REACT_APP_VENLY_CHAINID
  };
  Venly.createProviderEngine(options)
    .then(async function (prov) {
        window.web3 = new Web3(prov);
    })
    .catch((reason) => {
        if (reason) {
            switch (reason) {
                case 'not-authenticated':
                    console.log('User is not authenticated (closed window?)', reason);
                    break;
                case 'no-wallet-linked':
                    console.log('No wallet was linked to this application', reason);
                    break;
                default:
                    console.log('Something went wrong while creating the Venly provider', reason);
            }
        } else {
            console.log('Something went wrong while creating the Venly provider');
        }
    });
}

export async function ConnectWallet (walletType) {
    try {
      if (walletType === "metamask") {
        await window.ethereum.request({ "method": 'eth_requestAccounts'});
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{ chainId: process.env.REACT_APP_CHAINID, rpcUrls: [process.env.REACT_APP_HTTPPROVIDER], chainName: process.env.REACT_APP_CHAINNAME ,blockExplorerUrls: [process.env.REACT_APP_EXPLORER_ADDRESS ], nativeCurrency: { name: process.env.REACT_APP_CONTRACT_COIN, decimals: 18, symbol: process.env.REACT_APP_CONTRACT_COIN }}],
        });
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
          return
        })
        window.web3 = new Web3(window.ethereum);
        return { provider: window.ethereum, account: { address: accounts[0] }}
      } else {
        let authenticationOptions = {};
        if (walletType) {
            authenticationOptions.idpHint = walletType;
        }
        const venlyAccount = await window.Venly.authenticate(authenticationOptions)
        const account = { address: venlyAccount.wallets[0].address, email: venlyAccount.auth.idTokenParsed.email }
        return { provider: window.web3.currentProvider, account }
      }
    } catch(e) {
      console.log("Could not get a wallet connection", e);
      return null;
  }
}

export async function FetchUserData (provider) {
  const contract = new window.web3.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
  const accounts = await window.web3.eth.getAccounts()
  const supply = await contract.methods.balanceOf(accounts[0]).call()
  const balance = Web3.utils.fromWei( await window.web3.eth.getBalance(accounts[0]))
  return {address: accounts[0], supply, balance, provider }
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
  try {
    return await contract.methods.mint(count).send({from, value});
  }
  catch {
    return
  }
}

// function hashToken(address) {
//   return ethers.utils.solidityKeccak256(["address"], [address]).slice(2);
// }

// export async function MintPreSale (count, whitelisted) {
//   console.log(whitelisted)
//   const from = (await window.web3.eth.getAccounts())[0]
//   const tree = new MerkleTree(whitelisted.map(token => keccak256(token)),keccak256,{ sortPairs: true });
//   const proof = tree.getHexProof(hashToken(from));
//   console.log(tree.getHexRoot())
//   console.log(proof)
//   const contract = new window.web3.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
//   const value = count * await contract.methods.tokenPrice.call().call();
//   try {
//     return await contract.methods.whitelistedMints(proof, count).send({from, value});
//   }
//   catch {
//     console.log("")
//   }
// }

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