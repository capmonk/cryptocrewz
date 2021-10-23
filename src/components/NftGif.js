import React from "react";

function NftGif(props) {
	return (
		<div className="container nft-gif">
			<div className="row g-5">
				<div className="col-lg-7">
					<h2>{props.title}</h2>
					<p className="m-0">{props.content}</p>
				</div>
				<div className="col-lg-5 f-c f-col">
					<img className="shadow" src={props.gif} alt="CryptoCrewz NFT" />
				</div>
			</div>
		</div>
	);
}

export default NftGif;
