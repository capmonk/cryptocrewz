import React from "react";
import logo from "../img/logo.jpg";
import Button from "./Button";
import {
	FaUserCircle,
	FaDiscord,
	FaTwitter,
	FaInstagram,
} from "react-icons/fa";

export default function Nav() {
	return (
		<>
			<div className='fixed w-full top-0 flex flex-row justify-between p-5'>
				<div className='flex flex-row justify-center items-center left-0'>
					<img className='w-16 mr-5' src={logo} alt='CryptoCrewz' />
					<ul className='tile flex flex-row'>
						<a href='#home'>Home</a>
						<a href='#art'>NFT Art</a>
						<a href='#music'>NFT Music</a>
						<a href='#concert'>Livestream Concerts</a>
						<a href='#shop'>Shop Apparel</a>
						<a href='#metaverse'>Metaverse</a>
					</ul>
				</div>
				<div className='relative flex flex-row right-0 justify-center items-center'>
					<FaDiscord />
					<FaTwitter />
					<FaInstagram />
					<Button color='bg-blue-400' text='Login' icon={<FaUserCircle />} />
					<Button color='bg-red-400' text='MetaMask' />
				</div>
			</div>
		</>
	);
}
