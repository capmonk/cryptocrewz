import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Nav from "./components/Nav";
import NFTArt from "./components/NFTArt";
import NFTMusic from "./components/NFTMusic";
import ComingSoon from "./components/ComingSoon";
import Shop from "./components/Shop";
import Metaverse from "./components/Metaverse";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Nav />
			<div className='container px-5 mx-auto'>
				<Header>
					<p className='mb-4 text-xl font-medium'>
						You are witnessing the birth of the first high end crypto brand.
					</p>
					<p className='text-xl font-medium'>
						This is a statement. We have arrived. Join our Crewz in the
						Metaverse.
					</p>
				</Header>

				<Wrapper>
					<NFTArt />
				</Wrapper>

				<Wrapper>
					<NFTMusic />
				</Wrapper>

				<Wrapper>
					<h1 className='text-center'>MARKETPLACE COMING SOON</h1>
				</Wrapper>

				<Wrapper>
					<ComingSoon />
				</Wrapper>

				<Wrapper>
					<Shop />
				</Wrapper>

				<Wrapper>
					<Metaverse />
				</Wrapper>

				<Footer />
			</div>
		</>
	);
}

export default App;
