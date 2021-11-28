import React from "react";
import NftSlider from "./NftSlider";
import Tile from "./Tile";

export default function NFTArt() {
	return (
		<>
			<div className='grid gap-8 py-24 lg:grid-cols-2 grid-cols-1 auto-cols-auto'>
				<Tile accent={true}>
					<h2>The New Generation</h2>
					<p>
						CryptoCrewz is the beginning of a new culture. Birthed in the brave
						new world of Non-Fungible Tokens and cryptocurrencies, CryptoCrewz
						will be a major part of the soon-to be developed metaverse.
					</p>
				</Tile>

				<div className='row-span-2'>
					<Tile accent={true}>
						<h2>Unique And Priceless NFT Collection</h2>
						<p>
							The first project is our 10K NFT collection. 10,000 totally
							unique, customised characters celebrating hip hop and rap culture
							over the last 30 years, with a special homage to the greatest
							rappers and hip hop artists of all time, which will be released
							for minting around early December 2021
						</p>
					</Tile>
				</div>

				<Tile accent={true}>
					<h2>The Dawn Of A New Era</h2>
					<p>
						With major sponsors and influencers collaborating on the brand,
						CryptoCrewz is YOUR vision and statement to the world that YOU are
						part of the new Internet 3.0
					</p>
				</Tile>

				<div className='overflow-hidden lg:col-span-2 py-24'>
					<NftSlider />
				</div>

				<Tile accent={true}>
					<h2>Join Our Pre-Registration Whitelist</h2>
					<p>
						A whitelist will be up shortly on this website to pre-register your
						interest for a CryptoCrewz NFT Collectible, make sure to follow us
						on twitter and discord to not miss an update.
					</p>
				</Tile>

				<div className='flex flex-col justify-center items-center'>
					<h2>Placeholder</h2>
					<h2>Placeholder</h2>
				</div>
			</div>
		</>
	);
}
