import React from "react";
import Tile from "./Tile";

export default function ComingSoon() {
	return (
		<>
			<div id='#concert'>
				<h2 className='text-right'>Livestream Concerts</h2>
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-1 auto-cols-auto'>
					<Tile accent={true}>
						<p>
							Negotiations with event organisers are being made right now to get
							CryptoCrewz members premium first look access to PPV concerts and
							events via the NFTs that you own.
						</p>
						<p>
							Cryptocrewz is negotiating a partnership with a Virtual Reality
							Streaming Provider that will LIVE STREAM selected concerts to you.
							So real you are practically there in the crowd with your favourite
							artists performing for you.
						</p>
						<img
							className='mx-auto text-center'
							src='/imgs/vr-concert.png'
							alt='VR Concert'
						/>
						<p>
							Live in London but the concert is in New York? Live in Australia
							and can't travel to Las Vegas? This is now a thing of the past.
						</p>
						<p>
							Own a CryptoCrewz NFT or CryptoCrewz loyalty points that you can
							use to subsidise for tickets to these VR events.
						</p>
						<p>
							Don't have VR googles? Don't worry, standard 4K flat screen
							viewing will also be available. Can't make the time zone
							difference? Concert footage will be viewable to you as long as you
							own the NFT. However, once the NFT concert ticket is sold you lose
							access to viewing and owning the footage.
						</p>
					</Tile>
				</div>
			</div>
		</>
	);
}
