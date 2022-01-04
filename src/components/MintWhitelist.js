import { useState } from "react";
import toast from "react-hot-toast";
import emailValidator from "email-validator";
import { useSharedContractData } from "../store/ContractData"
import { useSharedUserData } from "../store/UserData"
import { GetWhitelisted, SubmitWhitelist } from "../services/api.service"

const MintWhitelist = () => {
  const [email, setEmail] = useState("")
  const [code, setCode] = useState("")
  const { contractData, whitelisted, setWhitelisted} = useSharedContractData();
  const { account } = useSharedUserData();

  const onWhitelisted = async () => {
    if (!emailValidator.validate(email)) {
      toast.error("Wrong email format!")
      return
    }
    if (account.balance < contractData.price) {
      toast.error("Not enough credits!")
      return
    }
    await SubmitWhitelist({account: account.address, email, code }).then ((x) => console.log(x)).catch(e => {
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
          <div>
            <div className={account.address && !whitelisted.includes(account.address)? "" : "opacity-20"}>
              <form onSubmit={handleSubmit} >
                <br/>
                Email: <input 
                className="text-black" 
                type="text" 
                value={email} 
                onChange={handleEmailChange}
                disabled={account.address === null || whitelisted.includes(account.address)}
                />
                <br/>
                <br/>
                Code: <input 
                className="text-black" 
                type="text" 
                value={code} 
                onChange={handleCodeChange}
                disabled={account.address === null || whitelisted.includes(account.address)}
                />
              </form>
              <br/>
                <button
                id="purchase-button-wrapper"
                type="button"
                className="border-green-440 hover:bg-green-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid"
                onClick={onWhitelisted}
                disabled={account.address === null || whitelisted.includes(account.address)}
              >
                Get whitelisted
              </button>
              
              </div>
              { whitelisted.includes(account.address) ? (<div
              className="opacity-100 text-red-600">
                You are already withelisted
              </div>):(<></>)}
              </div>
              
              );
            };
export default MintWhitelist;
