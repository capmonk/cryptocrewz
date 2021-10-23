import React from "react";
import RoadmapRow from "./RoadmapRow.js";
import man1 from "../img/merch-m-1.jpg";
import women1 from "../img/merch-w-1.jpg";
import man2 from "../img/merch-m-2.jpg";
import women2 from "../img/merch-w-2.jpg";
import man3 from "../img/merch-m-3.jpg";
import women3 from "../img/merch-w-3.jpg";

function Roadmap(props) {
	const merch = [man1, women1, man2, women2, man3, women3];

	return (
		<div className="map">
			<div
				className="bg-contain bg-center container f-col f-c"
				style={{ backgroundImage: `url(${props.bgImg})` }}
			>
				<div className="text-center">
					<h2 className="mb-2">{props.title}</h2>
					<p>{props.content}</p>
				</div>
				<RoadmapRow
					number="01"
					title="Exclusive Merch"
					p1="A few months after launch date we aim to open our merchandising store, which will include high quality urban streetwear; T-shirts, hoodies, caps and a 3D printed collectable of your very own unique individual NFT."
				/>
				<div className="row g-4 mt-4 merch">
					{merch.map((img) => (
						<div className="col-lg-6 f-c">
							<img src={img} alt={img} />
						</div>
					))}
				</div>
				<RoadmapRow
					number="02"
					title="Personalised Apparel"
					p1="Each 3D printed collectable will come stamped with your own crypto wallet key to match the NFT you have purchased."
					p2="Streetwear will come optional with your own Ethereum wallet encryption key printed directly on the streetwear so you can flaunt your ETH address and NFT purchase. "
				/>
				<RoadmapRow
					number="03"
					title="Absolutely Limited Access"
					p1="A maximum of 10,000 individual owners will have access to this customised exclusive merchandise, linked to their NFT. No one else will be allowed to print this onto their merchandise."
				/>
				<RoadmapRow
					number="04"
					title="Real World Events and Benefits"
					p1="Negotiations with event organisers are being made to get CryptoCrewz members premium first look access to concerts and events via promo codes."
					p2="CryptoCrewz members will also have access to be white-listed and prioritized for future CryptoCrewz releases."
				/>
				<RoadmapRow
					number="05"
					title="New Releases"
					p1="This includes new upcoming 10K NFT collections, not just artwork, but also directly digitally released music and video from world class rap, hip hop and pop artists, and limited edition music and entertainment memorabilia (both digital and real world)."
				/>
				<RoadmapRow
					number="06"
					title="Exclusive Ownership"
					p1="You may be able to listen to the latest hit single on Spotify, but what if you could be the owner of a limited edition original recording of a number 1 hit digitally signed by the artist themselves? Encrypted on the blockchain. Provable ownership. Provable rarity. No counterfeits."
				/>
			</div>
		</div>
	);
}

export default Roadmap;
