import React, { useState } from "react";
import logo from "../img/logo.jpg";
import Button from "./Button";
import { FaUserCircle, FaDiscord, FaTwitter, FaWallet } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import MusicButton from "./MusicButton";
import { useSharedUserData } from "../store/UserData";
import { ConnectWallet, DisconnectWallet, FetchUserData, GetMaxCount } from "../utils"
import { useSharedContractData } from "../store/ContractData"

export default function Nav() {
	const { account, setAccount, setCount } = useSharedUserData();
	const [isOpen, setIsOpen] = useState(false);
	const { contractData } = useSharedContractData();
	const closeNav = () => {
		return setIsOpen(false);
	}

	const fetchUserData = async () => {
    setAccount(await FetchUserData());
  }

  const connectWallet = async () => {
    const { provider, account} = await ConnectWallet()
    setAccount(account);
		setTimeout(() => {
      console.log("count", GetMaxCount(account, contractData))
      setCount(GetMaxCount(account, contractData))
    }, 200);
    
    
    provider.on("accountsChanged", async (accounts) => {
      const acc = await fetchUserData();
      setTimeout(() => {
        setCount(GetMaxCount(acc, contractData))
      }, 200);
    });

    provider.on("chainChanged", (chainId) => {
      if(chainId !== '0x13881') {
        setAccount({ address: null});
      }
    });
  
  }

  const disconnectWallet = async () => {
    await DisconnectWallet();
    setAccount({address: null});
  }
	return (
		<>
			<div className='sticky top-0 z-40 flex-row justify-between hidden w-full p-5 bg-black bg-opacity-60 lg:flex'>
				<div className='left-0 flex flex-row items-center justify-center nav'>
					<a href='#home'>
						<img className='w-16 mr-5' src={logo} alt='CryptoCrewz' />
					</a>
					<ul className='flex flex-row text-xl'>
						<a href='#art'>NFT Art</a>
						<a href='#music'>NFT Music</a>
						<a href='#concert'>Livestream Concerts</a>
						<a href='#shop'>Shop Apparel</a>
						<a href='#meta'>Metaverse</a>
						<a href='#team'>About Us</a>
					</ul>
				</div>
				<div className='relative right-0 flex flex-row items-center justify-center'>
					<div className='flex flex-row items-center justify-center'>
						<MusicButton className='text-lg border-blue-400' />
						<a
							href='https://twitter.com/cryptocrewz'
							className='mx-2 text-3xl text-white transition-all duration-300'
						>
							<FaTwitter />
						</a>
						<a
							className='mx-2 text-3xl text-white transition-all duration-300'
							href='https://discord.com/invite/t5zfQePbG6'
						>
							<FaDiscord />
						</a>
						<a
							href='https://opensea.io/'
							className='mx-2 text-3xl text-white transition-all duration-300'
						>
							<svg
								width='1em'
								height='1em'
								fill='white'
								viewBox='0 0 90 90'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.328 38.448 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.398 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.299 37.134 52.029C37.206 51.921 37.278 51.813 37.368 51.687C37.971 50.823 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.463C40.959 31.203 40.545 29.97 40.095 28.818C39.933 28.359 39.753 27.918 39.564 27.486C39.294 26.82 39.015 26.217 38.763 25.65C38.628 25.389 38.52 25.155 38.412 24.912C38.286 24.642 38.16 24.372 38.025 24.111C37.935 23.913 37.827 23.724 37.755 23.544L36.963 22.086C36.855 21.888 37.035 21.645 37.251 21.708L42.201 23.049H42.219C42.228 23.049 42.228 23.049 42.237 23.049L42.885 23.238L43.605 23.436L43.866 23.508V20.574C43.866 19.152 45 18 46.413 18C47.115 18 47.754 18.288 48.204 18.756C48.663 19.224 48.951 19.863 48.951 20.574V24.939L49.482 25.083C49.518 25.101 49.563 25.119 49.599 25.146C49.725 25.236 49.914 25.38 50.148 25.56C50.337 25.704 50.535 25.884 50.769 26.073C51.246 26.46 51.822 26.955 52.443 27.522C52.605 27.666 52.767 27.81 52.92 27.963C53.721 28.71 54.621 29.583 55.485 30.555C55.728 30.834 55.962 31.104 56.205 31.401C56.439 31.698 56.7 31.986 56.916 32.274C57.213 32.661 57.519 33.066 57.798 33.489C57.924 33.687 58.077 33.894 58.194 34.092C58.554 34.623 58.86 35.172 59.157 35.721C59.283 35.973 59.409 36.252 59.517 36.522C59.85 37.26 60.111 38.007 60.273 38.763C60.327 38.925 60.363 39.096 60.381 39.258V39.294C60.435 39.51 60.453 39.744 60.471 39.987C60.543 40.752 60.507 41.526 60.345 42.3C60.273 42.624 60.183 42.93 60.075 43.263C59.958 43.578 59.85 43.902 59.706 44.217C59.427 44.856 59.103 45.504 58.716 46.098C58.59 46.323 58.437 46.557 58.293 46.782C58.131 47.016 57.96 47.241 57.816 47.457C57.609 47.736 57.393 48.024 57.168 48.285C56.97 48.555 56.772 48.825 56.547 49.068C56.241 49.437 55.944 49.779 55.629 50.112C55.449 50.328 55.251 50.553 55.044 50.751C54.846 50.976 54.639 51.174 54.459 51.354C54.144 51.669 53.892 51.903 53.676 52.11L53.163 52.569C53.091 52.641 52.992 52.677 52.893 52.677H48.951V57.726H53.91C55.017 57.726 56.07 57.339 56.925 56.61C57.213 56.358 58.482 55.26 59.985 53.604C60.039 53.541 60.102 53.505 60.174 53.487L73.863 49.527C74.124 49.455 74.376 49.644 74.376 49.914V52.812V52.812Z' />
							</svg>
						</a>
					</div>
					<Button
						className='text-lg border-blue-400 hover:bg-blue-400'
						text='Login'
						icon={<FaUserCircle />}
						onClick={() => console.log("login")}
					/>
					{account.address ? (<button
						className='text-lg border-red-400 hover:bg-red-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out'
						onClick={disconnectWallet}
					>
						<FaWallet />
						Disconnect
					</button>) : (<button
						className='text-lg border-red-400 hover:bg-red-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out'
						onClick={connectWallet}
					>
						<FaWallet />
						Connect Wallet
					</button>)}
				</div>
			</div>

			<div className='fixed z-[99] flex flex-row justify-between w-screen p-2 lg:hidden'>
				<div className='nav-icon max-w-max' onClick={() => setIsOpen(!isOpen)}>
					<FiMenu />
				</div>
				<div className='flex flex-col'>
					<div className='flex flex-row pt-3 mb-3'>
						<a
							href='https://twitter.com/cryptocrewz'
							className='mx-2 text-3xl text-white transition-all duration-300'
						>
							<FaTwitter />
						</a>
						<a
							className='mx-2 text-3xl text-white transition-all duration-300'
							href='https://discord.com/invite/t5zfQePbG6'
						>
							<FaDiscord />
						</a>
						<a
							href='https://opensea.io/'
							className='mx-2 text-3xl text-white transition-all duration-300'
						>
							<svg
								width='1em'
								height='1em'
								fill='white'
								viewBox='0 0 90 90'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path d='M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.328 38.448 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.398 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.299 37.134 52.029C37.206 51.921 37.278 51.813 37.368 51.687C37.971 50.823 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.463C40.959 31.203 40.545 29.97 40.095 28.818C39.933 28.359 39.753 27.918 39.564 27.486C39.294 26.82 39.015 26.217 38.763 25.65C38.628 25.389 38.52 25.155 38.412 24.912C38.286 24.642 38.16 24.372 38.025 24.111C37.935 23.913 37.827 23.724 37.755 23.544L36.963 22.086C36.855 21.888 37.035 21.645 37.251 21.708L42.201 23.049H42.219C42.228 23.049 42.228 23.049 42.237 23.049L42.885 23.238L43.605 23.436L43.866 23.508V20.574C43.866 19.152 45 18 46.413 18C47.115 18 47.754 18.288 48.204 18.756C48.663 19.224 48.951 19.863 48.951 20.574V24.939L49.482 25.083C49.518 25.101 49.563 25.119 49.599 25.146C49.725 25.236 49.914 25.38 50.148 25.56C50.337 25.704 50.535 25.884 50.769 26.073C51.246 26.46 51.822 26.955 52.443 27.522C52.605 27.666 52.767 27.81 52.92 27.963C53.721 28.71 54.621 29.583 55.485 30.555C55.728 30.834 55.962 31.104 56.205 31.401C56.439 31.698 56.7 31.986 56.916 32.274C57.213 32.661 57.519 33.066 57.798 33.489C57.924 33.687 58.077 33.894 58.194 34.092C58.554 34.623 58.86 35.172 59.157 35.721C59.283 35.973 59.409 36.252 59.517 36.522C59.85 37.26 60.111 38.007 60.273 38.763C60.327 38.925 60.363 39.096 60.381 39.258V39.294C60.435 39.51 60.453 39.744 60.471 39.987C60.543 40.752 60.507 41.526 60.345 42.3C60.273 42.624 60.183 42.93 60.075 43.263C59.958 43.578 59.85 43.902 59.706 44.217C59.427 44.856 59.103 45.504 58.716 46.098C58.59 46.323 58.437 46.557 58.293 46.782C58.131 47.016 57.96 47.241 57.816 47.457C57.609 47.736 57.393 48.024 57.168 48.285C56.97 48.555 56.772 48.825 56.547 49.068C56.241 49.437 55.944 49.779 55.629 50.112C55.449 50.328 55.251 50.553 55.044 50.751C54.846 50.976 54.639 51.174 54.459 51.354C54.144 51.669 53.892 51.903 53.676 52.11L53.163 52.569C53.091 52.641 52.992 52.677 52.893 52.677H48.951V57.726H53.91C55.017 57.726 56.07 57.339 56.925 56.61C57.213 56.358 58.482 55.26 59.985 53.604C60.039 53.541 60.102 53.505 60.174 53.487L73.863 49.527C74.124 49.455 74.376 49.644 74.376 49.914V52.812V52.812Z' />
							</svg>
						</a>
					</div>
					<MusicButton className='text-lg border-blue-400' />
				</div>
			</div>

			{isOpen && (
				<>
					<div
						onClick={closeNav}
						className='fixed top-0 left-0 h-screen w-screen backdrop-filter backdrop-blur-sm z-[98]'
					></div>
					<div className='nav-mobile filter drop-shadow-lg'>
						<div className='relative flex items-center justify-center max-w-max'>
							<div className='relative flex flex-col'>
								<a href='#art' onClick={closeNav}>
									NFT Art
								</a>
								<a href='#music' onClick={closeNav}>
									NFT Music
								</a>
								<a href='#concert' onClick={closeNav}>
									Livestream Concerts
								</a>
								<a href='#shop' onClick={closeNav}>
									Shop Apparel
								</a>
								<a href='#meta' onClick={closeNav}>
									Metaverse
								</a>
								<Button
									className='text-lg border-blue-400 hover:bg-blue-400'
									text='Login'
									icon={<FaUserCircle />}
								/>
								{account.address ? (<button
									className='text-lg border-red-400 hover:bg-red-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out'
									onClick={disconnectWallet}
								>
									<FaWallet />
									Disconnect
								</button>) : (<button
									className='text-lg border-red-400 hover:bg-red-400 p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out'
									onClick={connectWallet}
								>
									<FaWallet />
									Connect Wallet
								</button>)}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
