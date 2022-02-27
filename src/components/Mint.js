import { Toaster } from "react-hot-toast";
// import { useSharedContractData } from "../store/ContractData";
import { useSharedUserData } from "../store/UserData";
import {
  ConnectWallet,
  DisconnectWallet,
  Init,
  GetContractData,
  FetchUserData
} from "../utils";
import { useSharedContractData } from "../store/ContractData";
import { useEffect, useState } from "react";
import { GetWhitelisted, isPresale, isWhitelisted } from "../services/api.service";
import twitter from "../img/logos/Twitter.png";
import google from "../img/logos/Google.png";
import facebook from "../img/logos/Facebook.png";
import metamask from "../img/logos/Metamask.svg";
import walletlink from "../img/logos/WalletLink.png";

// import PresaleRegister from "./PresaleRegister";
// import MintPresaleComponent from "./MintPresale";
import MintPublicsaleComponent from "./MintPublicsale";
import MintPresale from "./MintPresale";
import MintWhitelist from "./MintWhitelist";
import ContractInfo from "./ContractInfo";

const Mint = () => {
  const [walletModal, setWalletModal] = useState(false);
  // const [ provider, setProviderName ] = useState("");
  const { setContractData, setWhitelisted } = useSharedContractData();

  useEffect(() => {
    const InitWeb3 = async () => {
      console.log("asdf");
      const a = await GetContractData();
      console.log(a);
      setContractData(a);

    };
    Init();
    InitWeb3();
  }, [setContractData, setWhitelisted]);
  
  const { contractData } = useSharedContractData();
  const { setAccount, account, setCode, setEmail, setCount} = useSharedUserData();

  const GetUserData = async (walletType, account) => {
    const acc = await FetchUserData(account.address);
    account.type = walletType;
    account.balance = acc.balance;
    account.supply = acc.supply;
    setCount(contractData.maxMainsale - account.supply);
    account.isWhitelisted = (await isWhitelisted(account.address)).iswhitelisted
    account.isPresale = (await isPresale(account.address)).iswhitelisted
    console.log( account.isWhitelisted, account.isPresale )
    setAccount(account);
  }
  const openWalletModal = async () => {
    if (window.ethereum && detectMobile()) {
      try {
        let walletType = "metamask"
        if (!window.ethereum.isMetaMask) {
          walletType = "walletlink"
        }
        const { provider, account } = await ConnectWallet(walletType);
        GetUserData(walletType, account);
        setWalletModal(false)
        
        provider.on("accountsChanged", async (accounts) => {
          setAccount({ address: accounts[0], email: ""})
          setEmail("");
          setCode("");
          GetUserData(walletType,{ "address": accounts[0], "email": "" });
          setWalletModal(false);
        });

        provider.on("chainChanged", (chainId) => {
          if (chainId !== process.env.REACT_APP_CHAINID) {
            setAccount({ address: null, email: "" });
            setEmail("");
            setCode("");
          }
        });
      } catch {
        console.log()
      }
    } else {
      setWalletModal(true);
    }

  }
  const closeWalletModal = () => {
    setWalletModal(false)
  }
  const connectWallet = async (walletType) => {
    try {
      if ( detectMobile() && walletType === "metamask") {
        window.open(process.env.REACT_APP_METAMASKDEEPLINK);
        return;
      }
      const { provider, account } = await ConnectWallet(walletType);
      account.type = walletType;
      if (walletType !== "metamask" && walletType !== "walletlink") {
        account.type = "venly_" + walletType
      }

      GetUserData(walletType, account);
      setWalletModal(false);
      provider.on("accountsChanged", async (accounts) => {
        setAccount({ address: accounts[0], email: ""})
        setEmail("");
        setCode("");
        GetUserData(walletType, { "address": accounts[0], "email": "" });
        setWalletModal(false);
      });

      provider.on("chainChanged", (chainId) => {
        if (chainId !== process.env.REACT_APP_CHAINID) {
          setAccount({ address: null, email: "" });
          setEmail("");
          setCode("");
        }
      });
    } catch {
      console.log()
    }
    
  };

  const detectMobile = () => {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
  }

  const disconnectWallet = async () => {
    try {
      if (window.Venly.connect()){
        window.Venly.connect().logout({ windowMode: 'POPUP' })
      }
      await DisconnectWallet();
    } catch {
      console.log()
    }
    setAccount({ address: null, email: "" });
    setEmail("");
    setCode("");
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          className: "toast",
        }}
      />
      <div className="mint-container w-96" >
        <div id="claim-text-wrapper" className="col-7 flex flex-col items-center">
        <div className="h-20">
          {account.address ? (
            <div>
              <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 hover:bg-green-400 py-2 w-72 px-9 pr-12 uppercase mx-2 italic text-xl border border-solid rounded-full"
                onClick={disconnectWallet}
              >
                Disconnect a wallet
              </button>
              { account.address ? (<div className="flex flex-col items-center text-xs font-light mt-3"><div><strong className="text-base">Wallet: </strong>   <a  href={process.env.REACT_APP_EXPLORER_ADDRESS + '/address/' + account.address} target="_blank" rel="noreferrer">{ account.address }</a></div></div>) :(<></>) }
            </div>
          ) : (
            <div>
              <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 w-72 hover:bg-green-400 py-2 px-9 pr-12 uppercase italic mx-2 text-xl border border-solid rounded-full"
                onClick={openWalletModal}
              >
                Connect a wallet
              </button>
            </div>
            
          )}
        </div>
        <div className="h-64 w-96 mt-12">
          { !contractData.address && !contractData.whitelistSaleIsActive && !contractData.preSaleIsActive && !contractData.publicSaleIsActive ? (
            <div className="w-full text-center">Loading contract data.</div>) 
            :(<></>)}
          { contractData.address && !contractData.whitelistSaleIsActive && !contractData.preSaleIsActive && !contractData.publicSaleIsActive ? (
              <p>No sale currently.</p>) 
            :(<></>)}
            { contractData.address && contractData.whitelistSaleIsActive && !contractData.preSaleIsActive && !contractData.publicSaleIsActive ? (
              <MintWhitelist />) 
            :(<></>)}
            { contractData.address && contractData.preSaleIsActive && !contractData.publicSaleIsActive ? (
              <MintPresale />) 
            :(<></>)}
            { contractData.address && contractData.publicSaleIsActive  ? (
              <MintPublicsaleComponent /> )
            :(<></>)}
            <ContractInfo />
          </div>
        </div>
      </div>
      {/* primary: "#1f1f1f",
				secondary: "#383838" */}
        { walletModal ? (<>
      <div className="left-0 top-0 fixed h-screen w-screen">
        <div className="absolute left-0 top-0  h-screen w-screen bg-black opacity-90" onClick={closeWalletModal}></div>
        <div className="absolute left-0 top-0  h-screen w-screen grid justify-items-center items-center pointer-events-none" >
          <div className="flex flex-col items-center p-4 w-80 bg-opacity-50 rounded-3xl  pointer-events-auto" style={{ "backgroundColor": "#1b1e26"}}>
            <div className="mb-3">Connect with:</div>
            {  true ? (<>
            <button onClick={() => {connectWallet("metamask")}} className="flex flex-row items-center justifty-spacebetween bg-black bg-opacity-40 hover:bg-gray-800 w-full h-12 p-4 mb-4 h-16 rounded-3xl font-light" >
            <img className="h-6 ml-2 mr-5" alt="Metamask" src={metamask}></img>
              Metamask
            </button>
            </>): (<></>)}

            <button onClick={() => {connectWallet("walletlink")}} className="flex flex-row items-center justifty-spacebetween bg-black bg-opacity-40 hover:bg-gray-800 w-full h-12 mb-4 p-4 h-16 rounded-3xl font-light">
            <img className="h-8 ml-2 mr-5" alt="Facebook" src={walletlink}></img>
            <div>
              Continue with Coinbase Wallet
              </div>
            </button>

            <button onClick={() => {connectWallet("google")}} className="flex flex-row items-center justifty-spacebetween bg-black bg-opacity-40 hover:bg-gray-800 w-full h-12 p-4 mb-4 h-16 rounded-3xl font-light">
              <img className="h-8 ml-2 mr-5" alt="Google" src={google}></img>
              <div>
                Continue with Google
                <span className="text-xs"> (Venly)</span>
              </div>
            </button>
            
            <button onClick={() => {connectWallet("twitter")}} className="flex flex-row items-center justifty-spacebetween bg-black bg-opacity-40 hover:bg-gray-800 w-full h-12 p-4 mb-4 h-16 rounded-3xl font-light">
              <img className="h-8 ml-2 mr-5" alt="Twitter" src={twitter}></img>
              <div>Continue with Twitter
                <span className="text-xs"> (Venly)</span>
              </div>
            </button>

            <button onClick={() => {connectWallet("facebook")}} className="flex flex-row items-center justifty-spacebetween bg-black bg-opacity-40 hover:bg-gray-800 w-full h-12 p-4 h-16 rounded-3xl font-light">
            <img className="h-8 ml-2 mr-5" alt="Facebook" src={facebook}></img>
            <div>
              Continue with Facebook
              <span className="text-xs"> (Venly)</span>
              </div>
            </button>

            {/* <button onClick={() => {connectWallet("")}} className="flex flex-row items-center justifty-spacebetween bg-black bg-opacity-40 hover:bg-gray-800 w-full h-12 p-4 h-16 rounded-3xl font-light">
            <img className="h-8 ml-2 mr-5" alt="Venly" src={venly}></img>
            <div>
              Venly
              </div>
            </button> */}
          </div>
        </div>
      </div></>): (<></>)}
    </div>
  );
};

export default Mint;
