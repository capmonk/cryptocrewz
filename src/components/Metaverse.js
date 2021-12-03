import React from "react";
import Tile from "./Tile";

export default function Metaverse() {
	return (
		<div id='meta'>
			<h2 className='text-right'>Metaverse</h2>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-1 auto-cols-auto'>
				<Tile accent={true}>
					<p>
						Our next release will be 3D NFT characters fully compatible with the
						upcoming Facebook metaverse.
					</p>
					<img
						className='mix-blend-luminosity'
						src='/imgs/metaverse2.png'
						alt='CryptoCrewz Metaverse'
					/>
					<p>
						Customise your NFT character avatar, purchase digital clothes,
						shoes, accessories. All available on this platform. Purchase using
						cryptocurrency , CryptoCrewz loyalty points, standard currencies or
						a mixture of all.
					</p>
					<p>The metaverse is our future. See you there.</p>
				</Tile>
			</div>
		</div>
	);
}
