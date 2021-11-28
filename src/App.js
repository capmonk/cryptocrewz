import Header from "./components/Header";
// import Nav from "./components/Nav";
import NFTArt from "./components/NFTArt";

function App() {
	return (
		<>
			{/* <Nav /> */}
			<div className='container mx-auto px-5'>
				<Header>
					<p className='font-medium text-xl mb-4'>
						You are witnessing the birth of the first high end crypto brand.
					</p>
					<p className='font-medium text-xl'>
						This is a statement. We have arrived. Join our Crewz in the
						Metaverse.
					</p>
				</Header>
				<NFTArt />
			</div>

			<div className='bg-transparent backdrop-filter backdrop-blur-md shadow-lg w-full'>
				<div className='container mx-auto px-5'></div>
			</div>
		</>
	);
}

export default App;
