import React from "react";
import Tile from "./Tile";
export default function NFTMusic() {
	return (
		<div id='music'>
			<div>
				<h2 className='text-right'>NFT Music</h2>
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
							You want to build and OWN your limited edition exclusive
							collection - music that represents YOU and what you love, not just
							a Spotify Playlist
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
					</Tile>
				</div>
			</div>
			<div className='mx-auto mt-16 text-center'>
				<h3>
					Recordifly connects superfans with their artists. This is the future
					of music.
				</h3>
			</div>
		</div>
	);
}
