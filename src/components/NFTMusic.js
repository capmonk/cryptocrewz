import React from "react";
import Tile from "./Tile";
export default function NFTMusic() {
	return (
		<div id='music'>
			<div>
				<h2 className='text-right'>NFT MUSIC</h2>
				<h3 className='text-right'>
					Join the Recordifly music platform by CryptoCrewz.
				</h3>
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-2 auto-cols-auto'>
					<Tile accent={true} bg='/imgs/male3.jpg' position='bg-left-center'>
						<h4>Music Super Fans.. is this you?</h4>
						<p>
							You crave the connection with your favourite artists that has been
							lost in the music world for the last decade.
						</p>
						<p>
							You want to own exclusive content from your artists that no one
							else has. Behind the scenes footage, remixes, interviews, limited
							edition album artwork and tracks
						</p>
						<p>
							You want something that is non-counterfeitable, with proven rarity
						</p>
						<p>
							You want to trade content with other fans via NFT's on this
							platform and others
						</p>
						<p>
							You want to display your music content and tastes as NFT's in your
							crypto wallet in the metaverse to show others
						</p>
						<p>
							You want to build and OWN your limited edition exclusive
							collection - music that represents YOU and what you love, not just
							a Spotify Playlist
						</p>
						<p>
							You want to support your favourite artists by buying fractional
							ownership in their hit songs. Every time the song plays on Spotify
							or Apple or Youtube, the artist earns royalties and YOU EARN
							loyalty points. Your loyalty points can be redeemed for new
							content on our platform, from music, to videos, to concert
							tickets, to merchandise and apparel.{" "}
						</p>
					</Tile>
					<Tile accent={true} bg='/imgs/women2.jpg' position='bg-right'>
						<h4>Artists.. is this you?</h4>
						<p>
							You want to take back control of your Masters from the record
							labels
						</p>
						<p>
							You are tired of being just a number on someone's Digital
							Streaming Provider playlist.
						</p>
						<p>
							You want better and more intimate connections with your biggest
							fans, including your supporters that were there for you when you
							just started out playing in small town gigs.
						</p>
						<p>
							You are tired of handing the creative ownership for all your hard
							work to the record labels who take most of the revenue and give
							you a fraction.{" "}
						</p>
						<p>
							Most of all you don't think it's fair you get paid 0.004 cents
							from the streaming providers per song that you poured all your
							creative energy into!
						</p>
						<p>
							RECORDIFLY CONNECTS SUPER FANS WITH THEIR ARTISTS. This is the
							future of music distribution.
						</p>
					</Tile>
				</div>
			</div>
		</div>
	);
}
