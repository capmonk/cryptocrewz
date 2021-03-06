import Web3 from "web3";
import ContractAbi from '../contract/abi.json';
import WalletLink from 'walletlink'
import { getMerkleProofPresale, getMerkleProofWhitelist } from "../services/api.service";

const APP_NAME = 'My Awesome App'
const APP_LOGO_URL = 'https://example.com/logo.png'
const ETH_JSONRPC_URL = 'https://matic-mumbai.chainstacklabs.com'
const CHAIN_ID = 1

export const walletLink = new WalletLink({
  appName: APP_NAME,
  appLogoUrl: APP_LOGO_URL,
  darkMode: false
})

export async function GetContractData () {
  const web3temp = new Web3(new Web3.providers.HttpProvider(process.env.REACT_APP_HTTPPROVIDER));
  const contract = new web3temp.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
  return { 
    price : Web3.utils.fromWei(await contract.methods.tokenBasicPrice.call().call()),
    whitelistprice: Web3.utils.fromWei(await contract.methods.tokenWhitelistPrice.call().call()),
    totalSupply: await contract.methods.totalSupply.call().call(),
    maxSupply: await contract.methods.maxSupply.call().call(),
    name: await contract.methods.name.call().call(),
    maxPresale: await contract.methods.maxPresale.call().call(),
    maxPerWallet: await contract.methods.maxPerWallet.call().call(),
    maxMainsale: await contract.methods.maxMainSale.call().call(),
    publicSaleIsActive: await contract.methods.publicSaleIsActive.call().call(),
    preSaleIsActive: await contract.methods.preSaleIsActive.call().call(),
    whitelistSaleIsActive: await contract.methods.whitelistSaleIsActive.call().call(),
    symbol: await contract.methods.symbol.call().call(),
    address: process.env.REACT_APP_CONTRACT_ADDRESS
  }
}

export async function Init() {
  const Venly = window.Venly;
  let options = {
    clientId: process.env.REACT_APP_VENLY_USERNAME,
    environment: (process.env.REACT_APP_VENLY_USERNAME === "Testaccount" ? "staging" : "production"),
    secretType: process.env.REACT_APP_VENLY_CHAINID,
    skipAuthentication: true

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
      } else if (walletType === 'walletlink') {
        const ethereum = walletLink.makeWeb3Provider(ETH_JSONRPC_URL, CHAIN_ID)
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{ chainId: process.env.REACT_APP_CHAINID, rpcUrls: [process.env.REACT_APP_HTTPPROVIDER], chainName: process.env.REACT_APP_CHAINNAME ,blockExplorerUrls: [process.env.REACT_APP_EXPLORER_ADDRESS ], nativeCurrency: { name: process.env.REACT_APP_CONTRACT_COIN, decimals: 18, symbol: process.env.REACT_APP_CONTRACT_COIN }}],
        });
        window.web3 = new Web3(ethereum);
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
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

export async function FetchUserData (address) {
  const contract = new window.web3.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
  const supply = await contract.methods.balanceOf(address).call()
  const balance = Web3.utils.fromWei( await window.web3.eth.getBalance(address))
  return { supply, balance }
}

export async function DisconnectWallet () {
  try {
    if (window.web3) {
      const provider = window.web3.currentProvider
      if(provider.disconnect) {
        await provider.disconnect();
      }
    }
    if (walletLink) {
      walletLink.disconnect();
    }
  } catch {
    console.log();
  }
}

export async function GetUserData () {
  if (window.web3) {
    const provider = window.web3.currentProvider
    if(provider.disconnect) {
      await provider.disconnect();

    }
  }
}

export async function MintPublicSale (count) {
  const contract = new window.web3.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
  const from = (await window.web3.eth.getAccounts())[0]

  const value = count * await contract.methods.tokenBasicPrice.call().call();
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

export async function MintPreSale (count) {
  const from = (await window.web3.eth.getAccounts())[0]

  const proof = await getMerkleProofPresale(from);

  const contract = new window.web3.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);
  const price = (await contract.methods.tokenBasicPrice.call().call());
  const value = Web3.utils.toBN( price * count);
  try {
    return await contract.methods.presaleMints(proof, count).send({ from, value });
  }
  catch {
    console.log("")
  }
}


export async function MintWhitelistSale (count) {
  const from = (await window.web3.eth.getAccounts())[0]

  const proof = await getMerkleProofWhitelist(from);

  const contract = new window.web3.eth.Contract(ContractAbi, process.env.REACT_APP_CONTRACT_ADDRESS);

  const price = await contract.methods.tokenWhitelistPrice.call().call();

  const value = Web3.utils.toBN( price * count);
  window.proof = proof;
  try {
    return await contract.methods.whitelistedMints(proof, count).send({ from, value });
  }
  catch {
    console.log("")
  }
}

export const GetMaxCount = (acc, contractData) => {
  // let maxCount = contractData.maxMainsale;
  // if (contractData.preSaleIsActive && !contractData.publicSaleIsActive) {
  //   maxCount = contractData.maxPerWallet - acc.supply
  // }
  // if (contractData.publicSaleIsActive) {
  //   maxCount = contractData.maxMainsale - acc.supply
  // }
  const maxCount = contractData.maxPerWallet - acc.supply
  return maxCount
}