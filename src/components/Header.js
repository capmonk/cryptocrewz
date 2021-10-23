import React from "react";
import logoGif from "../img/logo.gif";

function Header() {
	return (
		<div className="header f-c bg-cover bg-center">
			<img src={logoGif} alt="CryptoCrewz" />
		</div>
	);
}

export default Header;
