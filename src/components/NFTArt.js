import React from "react";
import NftSlider from "./NftSlider";
import Tile from "./Tile";
import Button from "./Button";

export default function NFTArt() {
	return (
		<div id='art'>
			<h2>NFT ART</h2>
			<div className='grid grid-cols-1 gap-8 lg:grid-cols-2 auto-cols-auto'>
				<Tile accent={true}>
					<h3>The New Generation</h3>
					<p>
						CryptoCrewz is the beginning of a new culture. Birthed in the brave
						new world of Non-Fungible Tokens and cryptocurrencies, CryptoCrewz
						will be a major part of the soon-to be developed metaverse.
					</p>
				</Tile>

				<div className='row-span-2'>
					<Tile accent={true} bg='/imgs/women1.jpg' position='bg-center'>
						<h3>Unique And Priceless NFT Collection</h3>
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
					<h3>The Dawn Of A New Era</h3>
					<p>
						With major sponsors and influencers collaborating on the brand,
						CryptoCrewz is YOUR vision and statement to the world that YOU are
						part of the new Internet 3.0
					</p>
				</Tile>

				<div className='py-24 overflow-hidden lg:col-span-2'>
					<NftSlider />
				</div>

				<Tile accent={true}>
					<h3>Join Our Pre-Registration Whitelist</h3>
					<p>
						A whitelist will be up shortly on this website to pre-register your
						interest for a CryptoCrewz NFT Collectible, make sure to follow us
						on twitter and discord to not miss an update.
					</p>
				</Tile>

				<div className='flex flex-col items-center justify-center'>
					<div>
						<Button
							text='Whitelisting and Pre-sales'
							className='w-full border-green-400 hover:bg-green-400'
						/>
						<Button
							text='Mint'
							className='w-full mt-4 border-blue-400 hover:bg-blue-400'
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
