import React from "react";
import { useSharedContractData } from "../store/ContractData";

export default function ContractInfo() {
  const { contractData } = useSharedContractData();

	return (
		<>
			<div id="contract-info" className="h-54">
      <div
              id="mint-price"
              className="flex items-center justify-center flex-col h-full"
            >
              { contractData.address ? (
              <div>
                <div className="flex flex-col items-center text-xs font-light mt-3"><div><strong className="text-base">Contract: </strong><a  href={process.env.REACT_APP_EXPLORER_ADDRESS + '/address/' + contractData.address} target="_blank" rel="noreferrer">{ contractData.address }</a></div></div>
                {/* <h4 className="mb-0.5">Contract data: </h4>
                <div className="grid grid-cols-2"> 
                <span>Contract name: </span>
                <span className="font-bold text-xl">{ contractData.name }</span>
                <span>Token symbol: </span>
                <span className="font-bold text-xl">{ contractData.symbol }</span> 
                <span >White list Price: </span>
                <span className="font-bold text-xl">{ contractData.whitelistprice } { process.env.REACT_APP_CONTRACT_COIN}</span>
                <span >Price: </span>
                <span className="font-bold text-xl">{ contractData.price } { process.env.REACT_APP_CONTRACT_COIN}</span>
                <span>Total supply: </span>
                <span className="font-bold text-xl">{ contractData.totalSupply }</span>
                <span>Max supply: </span>
                <span className="font-bold text-xl"> { contractData.maxSupply }</span>
                <span>Max in presale: </span>
                <span className="font-bold text-xl">{ contractData.maxPresale }</span>
                <span>Max in public sale: </span>
                <span className="font-bold text-xl">{ contractData.maxMainsale }</span>
                <span>Whitelist sale active: </span>
                <span className="font-bold text-xl">{ contractData.whitelistSaleIsActive ? "true":"false" }</span>
                <span>Presale sale active: </span>
                <span className="font-bold text-xl">{ contractData.preSaleIsActive ? "true":"false" }</span>
                <span>Public sale active: </span>
                <span className="font-bold text-xl">{ contractData.publicSaleIsActive ? "true":"false"}</span>
              </div>*/}
              </div>
              ) :(<>Loading contract data...</>)}
            </div>
      </div>
		</>
	);
}
