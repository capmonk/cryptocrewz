import { Toaster } from "react-hot-toast";
import { useSharedContractData } from "../store/ContractData";
import { useSharedUserData } from "../store/UserData";
import {
  ConnectWallet,
  DisconnectWallet,
  FetchUserData,
  GetMaxCount
} from "../utils";

import MintWhitelistComponent from "./MintWhitelist";
import MintPresaleComponent from "./MintPresale";
import MintPublicsaleComponent from "./MintPublicsale";

const Mint = () => {
  const { contractData } = useSharedContractData();
  const { account, setAccount, setCount } = useSharedUserData();

  const fetchUserData = async () => {
    const acc = await FetchUserData();
    setAccount(acc);
    return acc;
  };

  const connectWallet = async () => {
    const { provider, account } = await ConnectWallet();
    setAccount(account);
    setTimeout(() => {
      setCount(GetMaxCount(account, contractData));
    }, 200);

    provider.on("accountsChanged", async (accounts) => {
      const acc = await fetchUserData();
      setTimeout(() => {
        console.log("count", GetMaxCount(acc));
        setCount(GetMaxCount(acc));
      }, 200);
    });

    provider.on("chainChanged", (chainId) => {
      if (chainId !== process.env.REACT_APP_CHAINID) {
        setAccount({ address: null });
      }
    });
  };

  const disconnectWallet = async () => {
    await DisconnectWallet();
    setAccount({ address: null });
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          className: "toast",
        }}
      />
      <div className="mint-container">
        <div className="h-36">
          {account.address ? (
            <div>
              <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 hover:bg-green-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out"
                onClick={disconnectWallet}
              >
                Disconnect a wallet
              </button>
              {/* Address: <a href={process.env.REACT_APP_EXPLORER_ADDRESS + account.address} target="_blank" rel="noreferrer">{ account.address }</a>
              <br/>
              NFT Supply: { account.supply}
              <br/>
              Balance: { Math.round(account.balance * 100) / 100 }
              <br/> */}
            </div>
          ) : (
            <div className={contractData.address !== null ? "" : "opacity-20"}>
              <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 hover:bg-green-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid"
                onClick={connectWallet}
              >
                Connect a wallet
              </button>
            </div>
          )}
        </div>
        <div id="claim-text-wrapper" className="col-7 flex flex-col">
          <div className="h-64 w-96">

            {contractData.address && !contractData.preSaleIsActive && !contractData.publicSaleIsActive ? (
              <div>
                <MintWhitelistComponent />
              </div>
            ) : (<></>)}

            {contractData.address && contractData.preSaleIsActive && !contractData.publicSaleIsActive ? (
              <div>
                <MintPresaleComponent />
              </div>
            ) : (<></>)}

            {contractData.address && contractData.publicSaleIsActive ? (
              <div>
                <MintPublicsaleComponent />
              </div>
            ) : (<></>)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
