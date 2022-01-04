import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Nav from "./components/Nav";
// import NFTArt from "./components/NFTArt";
import NFTMusic from "./components/NFTMusic";
import Concert from "./components/Concert";
import Shop from "./components/Shop";
import Metaverse from "./components/Metaverse";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Nav />
			<div id='home' className='container px-5 mx-auto'>
				<Header>
					<div className='flex flex-col items-start text-center md:text-left'>
						<p className='mb-4 text-4xl font-bold tracking-tight lg:text-6xl'>
							The first high end crypto brand
						</p>
						<p className='text-4xl font-bold tracking-tight lg:text-6xl'>
							Join us in the metaverse
						</p>
					</div>
				</Header>

				{/* <Wrapper>
					<NFTArt />
				</Wrapper> */}

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
				</Wrapper>

				<Footer />
			</div>
		</>
	);
}

export default App;
