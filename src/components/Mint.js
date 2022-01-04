import { Toaster } from "react-hot-toast";
import { useSharedContractData } from "../store/ContractData"
import { useSharedUserData } from "../store/UserData"
import { ConnectWallet, DisconnectWallet, FetchUserData, MintPublicSale, GetMaxCount, MintPreSale } from "../utils"
import { GetWhitelisted, SubmitWhitelist } from "../services/api.service"
import { useState } from "react";
import toast from "react-hot-toast";
import emailValidator from "email-validator";

const Mint = () => {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const { contractData, whitelisted, setWhitelisted} = useSharedContractData();
  const { account, setAccount, count, setCount } = useSharedUserData();

  const fetchUserData = async () => {
    const acc = await FetchUserData()
    setAccount(acc);
    return acc
  }

  const connectWallet = async () => {
    const { provider, account } = await ConnectWallet()
    setAccount(account);
    setTimeout(() => {
      console.log("count", GetMaxCount(account, contractData))
      setCount(GetMaxCount(account, contractData))
    }, 200);
    
    
    provider.on("accountsChanged", async (accounts) => {
      const acc = await fetchUserData();
      setTimeout(() => {
        console.log("count", GetMaxCount(acc))
        setCount(GetMaxCount(acc))
      }, 200);
    });

    provider.on("chainChanged", (chainId) => {
      if(chainId !== '0x13881') {
        setAccount({ address: null});
      }
    });
  }

  const disconnectWallet = async () => {
    await DisconnectWallet();
    setAccount({address: null});
  }

  const onWhitelisted = async () => {
    if (!emailValidator.validate(email)) {
      toast.error("Wrong email format!")
      return
    }
    await SubmitWhitelist({account: account.address, email, code }).then ((x) => console.log(x)).catch(e => {
      toast.error(e.message)
    })
    GetWhitelisted().then((x) => setWhitelisted(x))
  }

  const mintMainSale = async () => {
    const whitelisted = await GetWhitelisted()
    setWhitelisted(whitelisted)

    if (count * contractData.price < account.balance && count > 0) {
      await MintPublicSale(count);
      fetchUserData();
    }
  }

  const mintPreSale = async () => {
    if (count * contractData.price < account.balance && count > 0) {
      await MintPreSale(count, whitelisted);
      toast.
      fetchUserData();
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const subCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
    if (count > GetMaxCount(account, contractData)) {
      setCount(GetMaxCount(account, contractData))
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
      <Toaster
        toastOptions={{
          className: "toast",
        }}
      />
      <div className="mint--container">
        <div id="claim-text-wrapper" className="col-7">
          <div id="payment-modal">
            { contractData.address && contractData.publicSaleIsActive ? (
              <div>
            <div className={account.address && account.supply < 10 ? "" : "opacity-20"}>
              <div id="payment-header">
                <div id="payment-header-text">
                  <h4 className="mb-2">Mint NFT</h4>
                  <p>Enter how many NFTs you want to mint. </p>
                </div>
              </div> 
              <div id="mint-number" className="mint-row">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="border-blue-400 hover:bg-blue-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out"
                    id="minus"
                    onClick={subCount}
                    disabled={account.address === null}
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
                    disabled={account.address === null}
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
                <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 hover:bg-green-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid"
                onClick={mintMainSale}
                disabled={account.address === null && account.supply < 10}
              >
                MINT
              </button>
              </div>
              </div>
              { account.address && account.supply > 9 ? (<div
              className="opacity-100 text-red-600">
                You already minted maximum tokens.
              </div>):(<></>)}
            </div>) :(<></>) }
          </div>

          {contractData.address && !contractData.preSaleIsActive && !contractData.publicSaleIsActive ? (
            <div>
            <div className={account.address && !whitelisted.includes(account.address)? "" : "opacity-20"}>
              <form onSubmit={handleSubmit} >
                Email:
                <br/>
                <input 
                className="text-black" 
                type="text" 
                value={email} 
                onChange={handleEmailChange}
                disabled={account.address === null}
                />
                <br/>
                <br/>
                Code: <input 
                className="text-black" 
                type="text" 
                value={code} 
                onChange={handleCodeChange}
                disabled={account.address === null}
                />
              </form>
              <br/>
                <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 hover:bg-green-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid"
                onClick={onWhitelisted}
                disabled={account.address === null}
              >
                Get whitelisted
              </button>
              
              </div>
              { whitelisted.includes(account.address) ? (<div
              className="opacity-100">
                You are already withelisted
              </div>):(<></>)}
              </div>
              ) : <></>}
          { contractData.address && contractData.preSaleIsActive && !contractData.publicSaleIsActive ? (
            <div>
            <div className={account.address && whitelisted.includes(account.address) ? "" : "opacity-20"}>
              <div id="payment-header">
                <div id="payment-header-text">
                  <h4 className="mb-2">Mint NFT Presale</h4>
                  <p>Enter how many NFTs you want to mint. </p>
                </div>
              </div> 
              <div id="mint-number" className="mint-row">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="border-blue-400 hover:bg-blue-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out"
                    id="minus"
                    onClick={subCount}
                    disabled={account.address === null}
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
                    disabled={account.address === null}
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
                <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 hover:bg-green-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid"
                onClick={mintPreSale}
                disabled={account.address === null && account.supply > 0}
              >
                MINT
              </button>
              </div>
            </div>
            { account.address && !whitelisted.includes(account.address) ? (<div
              className="opacity-100 text-red-600">
                You are not withelisted
              </div>):(<></>)}
              { account.address && account.supply > 0 ? (<div
              className="opacity-100 text-red-600">
                You already minted your tokens.
              </div>):(<></>)}
            </div>
            ) :(<></>) }

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
              {/* Address: <a href={process.env.REACT_APP_EXPLORER_ADDRESS + account.address} target="_blank">{ account.address }</a>
              <br/>
              NFT Supply: { account.supply}
              <br/>
              Balance: { Math.round(account.balance * 100) / 100 }
              <br/> */}
            </div>
          ) : (
            <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 hover:bg-green-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid"
                onClick={connectWallet}
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
