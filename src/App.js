import Nav from "./components/Nav.js";
import Header from "./components/Header.js";
import Cta from "./components/Cta.js";
import Row from "./components/Row.js";
import NftGif from "./components/NftGif.js";
import NftSlider from "./components/NftSlider.js";
import Join from "./components/Join.js";
import Roadmap from "./components/Roadmap.js";
import Team from "./components/Team.js";
import Discord from "./components/Discord.js";
import Footer from "./components/Footer.js";

function App() {
	return (
		<div>
			<Nav discord="" opensea="" twitter="" />
			<Header />
			<Cta
				title="Not just a 10K NFT Collection Drop."
				paragraph="You are witnessing the birth of the first high end crypto Brand."
				closing="This is a statement. We have arrived. Join our Crewz."
			/>
			<Row
				title="The New Generation"
				content="CryptoCrewz is the beginning of a new culture. Birthed in the brave new world of Non-Fungible Tokens and cryptocurrencies, CryptoCrewz will be a major part of the soon-to be developed metaverse."
				bgImg="img/generation-img.jpg"
				bgPosition="bg-right"
				rowPosition="align-items-start"
			/>
			<Row
				title="The Dawn of a New Era"
				content="With major sponsors and influencers collaborating on the brand, CryptoCrewz is YOUR vision and  statement to the world that YOU are part of the new Internet 3.0"
				bgImg="img/dawn.jpg"
				bgPosition="bg-left"
				rowPosition="align-items-end"
			/>
			<NftGif
				title="Unique and Priceless NFT Collection"
				content="The first project is our 10K NFT collection. 10,000 totally unique, customised characters celebrating hip hop and rap culture over the last 30 years, with a special homage to the greatest rappers and hip hop artists of all time, which will be released for minting around the week of November 26th 2021 Black Friday."
				gif="img/nft.jpg"
			/>
			<NftSlider />
			<Join
				title="Join Our Pre-Registration Whitelist"
				btn="REGISTER HERE FOR WHITELIST"
				content="A whitelist will be up shortly on this website to pre-register your interest for a CryptoCrewz Collectible, make sure to follow us on twitter and discord to not miss an update."
				discord="https://discord.gg/t5zfQePbG6"
				twitter="https://twitter.com/cryptocrewz"
			/>
			<Roadmap
				title="The Roadmap"
				content="Purchase and minting of one of these characters gives you access and utility to real world events."
				bgImg="img/roadmap.jpg"
			/>
			<div className="container">
				<div className="sec-pad">
					<h1 className="text-center">
						This is the digital future. This is CryptoCrewz.
					</h1>
				</div>
			</div>
			<Team
				title="The OG Crewz and Team"
				monk="img/nft.jpg"
				anise="img/nft.jpg"
				gsd="img/nft.jpg"
			/>
			<Discord
				title="Join our Crewz"
				content="Join us to get the news as soon as possible and follow our latestannouncements"
				discord="https://discord.gg/t5zfQePbG6"
			/>
			<Footer logo="img/logo.jpg" />
		</div>
	);
}

export default App;
