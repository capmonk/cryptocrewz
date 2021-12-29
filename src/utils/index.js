// import Web3 from "web3";
// import Web3Utils from "web3-utils";
// import SmartContract from "../contract/abi.json";
// import toast from "react-hot-toast";

// const mintPrice = 0.05;
// const correctNetworkID = 4;
// const providerUrl = "https://matic-mumbai.chainstacklabs.com"

// export async function GetContractDate () {
//   if (!window.ethereum) {
//     window.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
//   }
//   console.log("web3", window.web3)
//   // const contract = new window.web3.eth.Contract(SmartContract, process.env.REACT_APP_CONTRACT_ADDRESS);
//   // console.log("contract", contract)
//   // console.log(await contract.methods.preSaleIsActive().send());
// }
// async function processMinting(type, _amount, ethObj) {
//   const { isMintingActive, isPresaleStarts, account } = ethObj;
//   const { mint, preSaleMint } = ethObj.methods;

//   switch (type) {
//     case isMintingActive:
//       mint(account, _amount)
//         .send({
//           from: account,
//           value: Web3Utils.toWei((Number(mintPrice) * _amount).toString(), "ether"),
//         })
//         .once("error", (err) => {
//           toast.success(err.stack);
//         })
//         .then((success) => {
//           if (success?.status) {
//             toast.success("Congratulations. Your NFT's successfully claimed");
            
//           }
//         });
//       break;
//       case isPresaleStarts:
//         preSaleMint(_amount)
//         .send({
//           from: account,
//           value: Web3Utils.toWei((Number(mintPrice) * _amount).toString(), "ether"),
//         })
//         .once("error", (err) => {
//         alert(err.stack);
//         })
//         .then((success) => {
//           if (success?.status) {
//             toast.success("Congratulations. Your NFT's successfully claimed");
//           }
//         });
//         break;
//     default:
//       return toast.error("Error: Process can not be started. Please try again");
//   }
// }

// export async function handleMintBtnClick(e, _amount, ethObj) {
//   e.preventDefault();

//   if (!ethObj || !_amount) {
//     toast.error("Reload and stay on page");
//     return;
//   }

//   const { isMintingActive, isPresaleStarts } = ethObj;


//   if (!isMintingActive && !isPresaleStarts) return toast.error("Error in minting: Minting unavailable");;

//   return isPresaleStarts ? await processMinting(isPresaleStarts, _amount, ethObj) : await processMinting(isMintingActive, _amount, ethObj);
// }

// export default async function connectWallet(setEthObj) {
//   if (
//     typeof window.ethereum === "undefined"
//   ) {
//     window.open("https://www.metamask.io", "_blank");
//     toast.error("Please install MetaMask");
//     return;
//   }
//   try {
//     const web3 = new Web3(window.ethereum);
    
//     const connectAccount = await window.ethereum.request({
//       method: "eth_requestAccounts"
//     });
    
//     const accountID = connectAccount[0];

//     const networkId = await window.ethereum.request({
//       method: "net_version",
//     });
    

//     window.ethereum.on("chainChanged", () => {
//       window.location.reload();
//     });

//     window.ethereum.on("accountsChanged", () => {
//       window.location.reload();
//     });
    
//     if (parseInt(networkId) === correctNetworkID) {

//       const smartContractObj = new web3.eth.Contract(
//         SmartContract.abi,
//         process.env.REACT_APP_CONTRACT_ADDRESS,
//       );

//       const isPresaleStarts = await smartContractObj.methods
//         .isAllowListActive()
//         ?.call();

//       const isMintingActive = await smartContractObj.methods
//         ?.isActive()
//         ?.call();

//       if (!isMintingActive && !isPresaleStarts) {
//           toast.error("You are not able to mint now");
//       } 

//       const resolver = {
//         isPresaleStarts,
//         isMintingActive,
//         methods: smartContractObj.methods,
//         smartContractObj,
//         account: accountID,
//         web3,
//       }

//       setEthObj(resolver);

//       return resolver;

//     } else {
//         toast.error("Switch to ethereum mainnet");
//     }
//   } catch (err) {
//     toast.error(err.stack);
//   }
// }
import Web3 from "web3";
import Web3Modal, { getProviderInfo } from "@venly/web3modal";
import ContractAbi from '../contract/abi.json';

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


export const updateMintState = (presale, publicsale) => {
  if (!presale && !publicsale) {
    // setMintState('whitelist')
  }
  if (presale && !publicsale) {
    // setMintState('presale')
  }
  if (publicsale) {
    // setMintState('publicsale')
  }
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