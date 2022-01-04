import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Nav from "./components/Nav";
// import NFTArt from "./components/NFTArt";
// import NFTMusic from "./components/NFTMusic";
// import Concert from "./components/Concert";
// import Shop from "./components/Shop";
// import Metaverse from "./components/Metaverse";
// import About from "./components/About";
import Footer from "./components/Footer";
import { GetContractData, Init } from "./utils";
import { useSharedContractData } from "./store/ContractData"
import { useEffect } from "react";
import { GetWhitelisted } from "./services/api.service";
import Mint from "./components/Mint";
import ContractInfo from "./components/ContractInfo";
// /import toast, { Toaster } from "react-hot-toast";

function App() {
	const { setContractData, setWhitelisted } = useSharedContractData();
	

	useEffect(() => {
		const InitWeb3 = async () => {
			setContractData(await GetContractData());
		}
		Init();
		InitWeb3();
		GetWhitelisted().then((x) => {
			setWhitelisted(x)
		})
	}, [setContractData, setWhitelisted]);

	return (
		<>
		<Toaster
		toastOptions={{
			className: "toast",
		}}
		/>
			<Nav />
			<div id='home' className='container px-5 mx-auto w-full' >
				<Header  className="w-full">
				</Header>
				<Wrapper>
				<div className='flex flex-row flex-wrap items-center justify-center text-center md:text-left' >
				<Mint screens></Mint>
						<ContractInfo />
					</div>
				</Wrapper>
				{/* <Wrapper>
					<NFTArt />
				</Wrapper>

				<Wrapper>
					<NFTMusic />
				</Wrapper>

				<Wrapper>
					<h1 className='text-center'>
						Recordifly Music Platform
						<br />
						Coming Soon
					</h1>
					<p className='mt-4 text-center'>
						Buy, sell, and auction your limited edition NFT music content. Spend
						your loyalty points on cool gear, new music, and merchandise.
					</p>
				</Wrapper>

				<Wrapper>
					<Concert />
				</Wrapper>

				<Wrapper>
					<Shop />
				</Wrapper>

				<Wrapper>
					<Metaverse />
				</Wrapper>

				<Wrapper>
					<About />
				</Wrapper> */}

				<Footer />
			</div>
		</>
	);
}

export default App;
