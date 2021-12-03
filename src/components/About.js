import React, { useState } from "react";
import Modal from "./Modal";
import { FaTwitter, FaInstagram } from "react-icons/fa";

export default function About() {
	const [openAnise, setOpenAnise] = useState(false);
	const [openCap, setOpenCap] = useState(false);

	return (
		<>
			<div id='team'>
				<h2 className='text-right'>About Us</h2>
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-2 auto-cols-auto'>
					<div className='flex flex-col items-center justify-center text-center'>
						<img
							className='cursor-pointer'
							src='/imgs/anise.jpg'
							alt='AniseK'
							onClick={() => setOpenAnise(true)}
						/>
						<h3
							className='mt-4 cursor-pointer'
							onClick={() => setOpenAnise(true)}
						>
							Anise K.
						</h3>
						<div className='flex flex-row text-3xl'>
							<a href='https://twitter.com/Anisekmusic'>
								<FaTwitter />
							</a>
							<a href='https://www.instagram.com/anisekofficial/'>
								<FaInstagram />
							</a>
						</div>
					</div>
					<div className='flex flex-col items-center justify-center text-center'>
						<img
							className='cursor-pointer'
							src='/imgs/cap.png'
							alt='CapitalistMonk'
							onClick={() => setOpenCap(true)}
						/>
						<h3
							className='mt-4 cursor-pointer'
							onClick={() => setOpenCap(true)}
						>
							CapitalistMonk
						</h3>
						<div className='flex flex-row text-3xl'>
							<a href='https://twitter.com/MonkCapitalist'>
								<FaTwitter />
							</a>
						</div>
					</div>
				</div>
			</div>
			<Modal state={openAnise} off={() => setOpenAnise(false)}>
				<p>
					Anise K is a Multi-platinum selling international recording artist,
					record producer, and entertainment entrepreneur. Anise has proven
					talent for producing high quality projects and executing brand
					promotion garnering superior sales results.
				</p>
				<p>
					Having worked with some of the biggest artists in the world, it has
					allowed Anise to built a strong network and reputation within the
					International entertainment community.
				</p>
			</Modal>

			<Modal state={openCap} off={() => setOpenCap(false)}>
				<p>
					CapitalistMonk (real life Internet 1.0 name Hiram Ng), is a tech and
					property entrepenuer based in Australia with a Master's Degree in
					Engineering that has a 20 year history of tech start ups,
					international management consulting, mergers/acquisitions and Venture
					Capital. He has built multiple businesses from the ground up to a $30m
					exit valuation.
				</p>
				<p>
					CryptoCrewz is his latest innovation and disruption in the Web3
					metaverse space, with the goal to create a powerhouse brand that
					resonants across multiple markets.
				</p>
			</Modal>
		</>
	);
}
