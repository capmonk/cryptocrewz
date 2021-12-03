import React from "react";
import { FaTwitter, FaInstagram } from "react-icons/fa";

export default function About() {
	return (
		<>
			<div id='team'>
				<h2 className='text-right'>About Us</h2>
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-2 auto-cols-auto'>
					<div className='flex flex-col items-center justify-center text-center'>
						<img src='/imgs/anise.jpg' alt='AniseK' />
						<h3 className='mt-4'>Anise K.</h3>
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
						<img src='/imgs/cap.png' alt='CapitalistMonk' />
						<h3 className='mt-4'>CapitalistMonk</h3>
						<div className='flex flex-row text-3xl'>
							<a href='https://twitter.com/MonkCapitalist'>
								<FaTwitter />
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
