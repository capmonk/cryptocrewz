import React from "react";
import logoGif from "../img/logo.gif";
import concert from "../video/concert.mp4";

export default function Header() {
	return (
		<>
			<div className='text-center flex flex-col justify-center items-center md:h-screen'>
				<video
					className='z-[-1] absolute top-0 left-0 w-full h-full object-cover object-center mix-blend-luminosity opacity-50'
					autoPlay
					loop
					muted
				>
					<source src={concert} type='video/mp4' />
				</video>
				<img className='w-1/2 max-w-xl' src={logoGif} alt='CryptoCrewz' />
				<p className='font-medium text-xl'>
					You are witnessing the birth of the first high end crypto brand.
				</p>
				<p className='font-medium text-xl'>
					This is a statement. We have arrived. Join our Crewz in the Metaverse.
				</p>
			</div>
		</>
	);
}
