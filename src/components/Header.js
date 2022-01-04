import React from "react";
import logoGif from "../img/logo.gif";
import concert from "../video/concert.mp4";

export default function Header({ children }) {
	return (
		<>
			<div className='flex flex-col items-center justify-center h-screen text-center lg:flex-row static h-0 '>
				<video
					className='z-[-1] fixed top-0 left-0 w-full h-full object-cover object-center mix-blend-luminosity opacity-20'
					autoPlay
					loop
					muted
				>
					<source src={concert} type='video/mp4' />
				</video>
				{/* <img
					className='w-full max-w-xl lg:w-1/2'
					src={logoGif}
					alt='CryptoCrewz'
				/> */}
				{children}
			</div>
		</>
	);
}
