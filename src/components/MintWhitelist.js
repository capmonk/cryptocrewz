import toast from "react-hot-toast";
import { useSharedContractData } from "../store/ContractData";
import { useSharedUserData } from "../store/UserData";
import {
  FetchUserData,
  GetMaxCount,
  MintWhitelistSale
} from "../utils";
import { useState } from "react";
import ContractInfo from "../components/ContractInfo";
import { isPresale, isWhitelisted } from "../services/api.service";

const MintWhiteListSale = () => {
  const { contractData } = useSharedContractData();
  const { account, count, setCount, setAccount } = useSharedUserData();
  const [minting, setMinting] = useState(false)

  const GetUserData = async (walletType, account) => {
    const acc = await FetchUserData(account.address);
    account.type = walletType;
    account.balance = acc.balance;
    account.supply = acc.supply;
    setCount(contractData.maxMainsale - account.supply);
    setAccount(account);
  }

  const mintWhitelist = async () => {
    if (count * contractData.whitelistprice < account.balance && count > 0) {
      setMinting(true)
      try {
        const result = await MintWhitelistSale(count);
        setMinting(false)
        if (result.status) {
          toast.success("Minted!");
        } else {
          toast.error("Error in transaction!")
        } 
        GetUserData()
      } catch {
        toast.error("Error in transaction!")
        setMinting(false)
      }
    } else {
      toast.error("Not enough credits!");
    }
  };

  const subCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
    if (count > GetMaxCount(account, contractData)) {
      setCount(GetMaxCount(account, contractData));
    }
  };

  const addCount = () => {
    if (count < GetMaxCount(account, contractData)) {
      setCount(count + 1);
    } else {
      setCount(GetMaxCount(account, contractData));
    }
  };

  return (
    <div>
    { !((account.isWhitelisted ^ (account.address !== null) && (account.address !== null))) ? (
    <div>
    { !minting ? (
    <div className="h-42">
      <div
        className={account.address && contractData.address && account.isWhitelisted ? "" : "opacity-20"}
      >
        <div id="payment-header w-full text-center ">
          <div id="payment-header-text w-full text-center">
            <h4 className="mb-2 w-full text-center font-light text-4xl">Whitelist Mint NFT</h4>
            <p className="w-full text-center font-light text-xs">Enter how many NFTs you want to mint. </p>
          </div>
        </div>
        <div id="mint-number" className="mint-row w-full flex flex-col justify-center ">
          <div className="flex justify-center mt-3 mb-3 w-full">
            <button
              type="button"
              className="h-8 w-8 border-blue-400 hover:bg-blue-400 p-2 uppercase  rounded-full  font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out"
              id="minus"
              onClick={subCount}
              disabled={account.address === null}
            >
              <svg
                className="translate-x-0.5 scale-150"
                width="16"
                height="2"
                viewBox="0 0 16 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1C0 1.26522 0.105357 1.51957 0.292893 1.70711C0.48043 1.89464 0.734784 2 1 2H15C15.2652 2 15.5196 1.89464 15.7071 1.70711C15.8946 1.51957 16 1.26522 16 1C16 0.734784 15.8946 0.48043 15.7071 0.292893C15.5196 0.105357 15.2652 0 15 0Z"
                  fill="white"
                />
              </svg>
            </button>
            <h5 className="mt-1 text-xl w-8 text-center">{count}</h5>
            <button
              type="button"
              className="h-8 w-8 border-blue-400 border-2 rounded-full hover:bg-blue-400 p-2 uppercase mx-2 text-3xl font-black flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out"
              id="plus"
              onClick={addCount}
              disabled={account.address === null}
            >
              <svg
                className="translate-x-0.5 scale-150"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 7H9V1C9 0.734784 8.89464 0.48043 8.70711 0.292893C8.51957 0.105357 8.26522 0 8 0C7.73478 0 7.48043 0.105357 7.29289 0.292893C7.10536 0.48043 7 0.734784 7 1V7H1C0.734784 7 0.48043 7.10536 0.292893 7.29289C0.105357 7.48043 0 7.73478 0 8C0 8.26522 0.105357 8.51957 0.292893 8.70711C0.48043 8.89464 0.734784 9 1 9H7V15C7 15.2652 7.10536 15.5196 7.29289 15.7071C7.48043 15.8946 7.73478 16 8 16C8.26522 16 8.51957 15.8946 8.70711 15.7071C8.89464 15.5196 9 15.2652 9 15V9H15C15.2652 9 15.5196 8.89464 15.7071 8.70711C15.8946 8.51957 16 8.26522 16 8C16 7.73478 15.8946 7.48043 15.7071 7.29289C15.5196 7.10536 15.2652 7 15 7Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-center w-full">
        <button
            id="purchase-button-wrapper"
            type="button"
            className="border-green-440 hover:bg-green-400 py-2 w-72 px-9 pr-12 uppercase italic text-xl border border-solid rounded-full mint-button"
            onClick={mintWhitelist}
            disabled={account.address === null && account.supply < 10}
          >
            MINT
          </button>
          </div>
      </div>
      {account.address && account.supply >= contractData.maxPerWallet ? (
        <div className="opacity-100 text-red-600 w-full text-center font-light">
          You already minted maximum tokens.
        </div>
      ) : (
        <></>
      )}
    </div>
    ): (<div className="w-full text-center font-light h-42">Minting...</div>)}
    </div> ): (<div className="h-3 w-full h-42 mb-12 text-center mt-12 font-light text-xl">You are not on the whitelist!</div>)}
    </div>
  );
};

export default MintWhiteListSale;
