import toast from "react-hot-toast";
import emailValidator from "email-validator";
import { useSharedContractData } from "../store/ContractData"
import { useSharedUserData } from "../store/UserData"
import { GetWhitelisted, SubmitWhitelist } from "../services/api.service"

const PresaleRegister = () => {
  const { whitelisted, setWhitelisted} = useSharedContractData();
  const { account, email, setEmail,code, setCode } = useSharedUserData();

  const onWhitelisted = async () => {
    const emailToSend = account.email ? account.email : email
    if (!emailValidator.validate(emailToSend)) {
      toast.error("Wrong email format!")
      return
    }
    // if (account.balance < contractData.price) {
    //   toast.error("Not enough credits on wallet!")
    //   return
    // }
    
    await SubmitWhitelist({account: account.address, email: emailToSend, code, type: account.type }).catch(e => {
      toast.error(e.message)
    })
    GetWhitelisted().then((x) => setWhitelisted(x))
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
  // style={{"background-color": "#4500FF22"}}
  return (
          <div >
            <div className={!whitelisted.includes(account.address)? "" : "hidden"}>
            <div className={account.address? "flex align-center items-center flex-col" : "opacity-20 flex items-center flex-col"}>
              <div className="text-center text-xl font-light" style={{ "maxWidth": "80vw" }}> 
              Enter your email (and promo code if available), to register on the pre-sale list.
              </div>
              <form onSubmit={handleSubmit} className="flex justify-center flex-col w-80 mb-5">
                <br/>
                <div>
                  <div className="flex flex-row justify-center items-end ">
                  <div className="mr-2">Email: </div>
                  
                  {account.email ? (<>{ account.email }</>):(<>
                  <input 
                  className="placeholder-gray-600 bg-transparent border-b w-60 mr-3 py-1 px-2 leading-tight focus:outline-none text-white" 
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={account.address === null || whitelisted.includes(account.address)}
                  />
                  </>) }
                  </div>
                  {/* <div className="bg-white h-px"></div> */}
                  <br/>
                  <div className="flex flex-row justify-center items-end ">
                  <div className="mr-2">Promo Code:</div>
                  <input 
                  className="bg-transparent border-b w-54 mr-3 py-1 px-2 leading-tight focus:outline-none text-white placeholder-white placeholder-opacity-20" 
                  type="text" 
                  value={code} 
                  onChange={handleCodeChange}
                  placeholder="optional"
                  disabled={account.address === null || whitelisted.includes(account.address)}
                  />
                  </div>
                </div>
              </form>
              { account.address ? (<div className="flex flex-col items-center text-xs font-light mt-3"><div><strong className="text-base">Wallet: </strong> { account.address }</div></div>) :(<></>) }
              <br/>
                <button
                id="purchase-button-wrapper"
                type="button"
                className="mt-2 border-green-440 w-86 hover:bg-green-400 py-2 px-9 pr-12 uppercase italic mx-2 text-2xl border border-emerald-600 rounded-full"
                onClick={onWhitelisted}
                disabled={account.address === null || whitelisted.includes(account.address)}
              >
                Register now
              </button>
              </div>
              </div >
              { whitelisted.includes(account.address) ? (<div
              className="opacity-100 text-white text-center font-light text-3xl mt-20">
                <div>
                  <div>You are successfully  
                  <br/>
                  pre-registered.
                  </div> 
                  <div className="flex flex-col items-center text-xs font-light mt-3"><div>
                    <strong className="text-base">Wallet: </strong>
                    { account.type && account.type.includes("venly") ? (
                    <a href="https://wallet.venly.io/">
                      { account.address }
                    </a>) : (
                        <a href={ process.env.REACT_APP_EXPLORER_ADDRESS + "/address/" + account.address }>
                        { account.address }
                      </a>
                    )
                    }
                    </div>
                  </div>
                </div>
              </div>):(<></>)}
              </div>
              
              );
            };
export default MintWhitelist;
