import { Toaster } from "react-hot-toast";
// import { useSharedContractData } from "../store/ContractData";
// import { useSharedUserData } from "../store/UserData";
// import {
//   ConnectWallet,
//   DisconnectWallet,
//   FetchUserData,
//   GetMaxCount,
// } from "../utils";

// import PresaleRegister from "./PresaleRegister";
// import MintPresaleComponent from "./MintPresale";
// import MintPublicsaleComponent from "./MintPublicsale";

const Mint = () => {
  // const { contractData } = useSharedContractData();
  // const { setAccount, setCount } = useSharedUserData();

  // const fetchUserData = async () => {
  //   const acc = await FetchUserData();
  //   setAccount(acc);
  //   return acc;
  // };

  // const connectWallet = async () => {
  //   const { provider, account } = await ConnectWallet();
  //   setAccount(account);
  //   setTimeout(() => {
  //     setCount(GetMaxCount(account, contractData));
  //   }, 200);

  //   provider.on("accountsChanged", async (accounts) => {
  //     const acc = await fetchUserData();
  //     setTimeout(() => {
  //       setCount(GetMaxCount(acc));
  //     }, 200);
  //   });

  //   provider.on("chainChanged", (chainId) => {
  //     if (chainId !== process.env.REACT_APP_CHAINID) {
  //       setAccount({ address: null });
  //     }
  //   });
  // };

  // const disconnectWallet = async () => {
  //   await DisconnectWallet();
  //   setAccount({ address: null });
  // };

  return (
    <div>
      <Toaster
        toastOptions={{
          className: "toast",
        }}
      />
      <div className="mint-container" >
        {/* <div className="h-36">
          {account.address ? (
            <div>
              <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 hover:bg-green-400 py-2 w-96 px-9  pr-12 uppercase mx-2 italic text-2xl border border-solid rounded-full"
                onClick={disconnectWallet}
              >
                Disconnect a wallet
              </button>
            </div>
          ) : (
            <div className={contractData.address !== null ? "" : "opacity-20"}>
              <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 w-96 hover:bg-green-400 py-2 px-9 pr-12 uppercase italic mx-2 text-2xl border border-solid rounded-full"
                onClick={connectWallet}
              >
                Connect a wallet
              </button>
            </div>
          )}
        </div> */}
        <div id="claim-text-wrapper" className="col-7 flex flex-col">
          <div className="h-64 w-96">
          <div
              className="opacity-100 text-white text-center font-light text-3xl mt-20">
                Coming very soon...
              </div>

            {/* {contractData.address &&
            contractData.preSaleIsActive &&
            !contractData.publicSaleIsActive ? (
              <div>
                <MintPresaleComponent />
              </div>
            ) : (
              <></>
            )}

            {contractData.address && contractData.publicSaleIsActive ? (
              <div>
                <MintPublicsaleComponent />
              </div>
            ) : (
              <></>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mint;
