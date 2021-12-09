import { useState } from "react";
import Web3Utils from "web3-utils";
import toast from "react-hot-toast";
import connectWallet, { handleMintBtnClick } from "../utils";
import { Toaster } from "react-hot-toast";

const price = 50;

const Mint = () => {
  const [count, setCount] = useState(0);
  const [blockchain, setEthObj] = useState({});
  const [mintDisabled, setMintDisabled] = useState(false);
  const weiToEther = (wei) => Web3Utils.fromWei(wei);
  console.log(blockchain);
  const checkBalance = async (balance, methods) => {
    const mintPrice = await methods?.getPrice().call();
    const convertedPriceToEther = weiToEther(`${mintPrice}`);

    const convertedBalanceToEther = weiToEther(`${balance}`);
    return convertedPriceToEther > convertedBalanceToEther;
  };

  const handleConnection = async () => {
    const req = await connectWallet(setEthObj);
    if (!req) return toast.error("Try Again");

    const accountBalance = await req?.web3?.eth?.getBalance(req.account);
    const hasNotFunds = await checkBalance(accountBalance, req.methods);

    if (hasNotFunds) {
      toast.error("Insufficient Funds");
      setMintDisabled(true);
    }
  };

  const claimNFTs = async (e) => {
    const price = (count * 90) / 1000;
    const priceInWei = Web3Utils.toWei(`${price}`);
    const hasNotFunds = await checkBalance(priceInWei, blockchain.methods);
    !hasNotFunds && (await handleMintBtnClick(e, count, blockchain));
  };

  const subCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  const addCount = () => {
    if (count < 6) {
      setCount(count + 1);
    }
  };
  return (
    <div>
      <Toaster
        toastOptions={{
          className: "toast",
        }}
      />
      <div className="mint--container">
        <div id="claim-text-wrapper" className="col-7">
          <div id="payment-modal">
            <div id="payment-header">
              <div id="payment-header-text">
                <h4 className="mb-2">Mint NFT</h4>
                <p>Enter how many NFTs you want to mint. </p>
              </div>
            </div>
            <div
              id="mint-price"
              className="d-flex items-center justify-between mint-row"
            >
              <p>Price</p>
              <h5>0.05 ETH Each</h5>
            </div>
            <div id="mint-number" className="mint-row">
              <h5>Amount</h5>
              <div className="flex items-center">
                <button
                  type="button"
                  className="border-blue-400 hover:bg-blue-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out"
                  id="minus"
                  onClick={subCount}
                  disabled={mintDisabled}
                >
                  <svg
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
                <h5>{count}</h5>
                <button
                  type="button"
                  className="border-blue-400 hover:bg-blue-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out"
                  id="plus"
                  onClick={addCount}
                  disabled={mintDisabled}
                >
                  <svg
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
              <h5 id="mint-max">10 Max</h5>
            </div>
            <div id="mint-total" className="mint-row">
              <p>Total</p>
              <h5>{(count * price) / 1000} ETH</h5>
            </div>
          </div>
          {blockchain?.account ? (
            <div>
              <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 hover:bg-green-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out"
                onClick={claimNFTs}
                disabled={mintDisabled}
              >
                Mint
              </button>
              <h6 className="mt-2">{blockchain.account}</h6>
            </div>
          ) : (
            <button
              id="purchase-button-wrapper"
              type="button"
              className="border-green-440 hover:bg-green-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid"
              onClick={handleConnection}
            >
              Connect a wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Mint;
