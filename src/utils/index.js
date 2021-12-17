import Web3 from "web3";
import Web3Utils from "web3-utils";
import SmartContract from "../contract/CryptoCrewz.json";
import toast from "react-hot-toast";

// Contract URL on TESTNET:
// https://rinkeby.etherscan.io/address/0xcb8981394fc231a5dcdca43ced5c816679242481#code

const mintPrice = 0.05;
const contractABI = "0xcb8981394fc231a5DcDca43ceD5C816679242481";

const correctNetworkID = 4;

async function processMinting(type, _amount, ethObj) {
  const { isMintingActive,isPresaleStarts,  account } = ethObj;
  const { mint, preSaleMint } = ethObj.methods;

  switch (type) {
    case isMintingActive:
      mint(account, _amount)
        .send({
          from: account,
          value: Web3Utils.toWei((Number(mintPrice) * _amount).toString(), "ether"),
        })
        .once("error", (err) => {
          toast.success(err.stack);
        })
        .then((success) => {
          if (success?.status) {
            toast.success("Congratulations. Your NFT's successfully claimed");
            
          }
        });
      break;
      case isPresaleStarts:
        preSaleMint(_amount)
        .send({
          from: account,
          value: Web3Utils.toWei((Number(mintPrice) * _amount).toString(), "ether"),
        })
        .once("error", (err) => {
         alert(err.stack);
        })
        .then((success) => {
          if (success?.status) {
            toast.success("Congratulations. Your NFT's successfully claimed");
          }
        });
    default:
      return toast.error("Error: Process can not be started. Please try again");
  }
}

export async function handleMintBtnClick(e, _amount, ethObj) {
  e.preventDefault();

  if (!ethObj || !_amount) {
    toast.error("Reload and stay on page");
    return;
  }

  const { isMintingActive, isPresaleStarts } = ethObj;


  if (!isMintingActive && !isPresaleStarts) return toast.error("Error in minting: Minting unavailable");;

  return isPresaleStarts ? await processMinting(isPresaleStarts, _amount, ethObj) : await processMinting(isMintingActive, _amount, ethObj);
}

export default async function connectWallet(setEthObj) {
  if (
    typeof window.ethereum === "undefined"
  ) {
    window.open("https://www.metamask.io", "_blank");
    toast.error("Please install MetaMask");
    return;
  }
  try {
    const web3 = new Web3(window.ethereum);
    
    const connectAccount = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    
    const accountID = connectAccount[0];

    const networkId = await window.ethereum.request({
      method: "net_version",
    });
    

    window.ethereum.on("chainChanged", () => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", () => {
      window.location.reload();
    });
    
    if (parseInt(networkId) === correctNetworkID) {

      const smartContractObj = new web3.eth.Contract(
        SmartContract.abi,
        contractABI,
      );

      const isPresaleStarts = await smartContractObj.methods
        .isAllowListActive()
        ?.call();

      const isMintingActive = await smartContractObj.methods
        ?.isActive()
        ?.call();

      if (!isMintingActive && !isPresaleStarts) {
          toast.error("You are not able to mint now");
      } 

      const resolver = {
        isPresaleStarts,
        isMintingActive,
        methods: smartContractObj.methods,
        smartContractObj,
        account: accountID,
        web3,
      }

      setEthObj(resolver);

      return resolver;

    } else {
        toast.error("Switch to ethereum mainnet");
    }
  } catch (err) {
    toast.error(err.stack);
  }
}
