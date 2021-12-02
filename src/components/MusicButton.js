import React, { useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import Sound from "react-sound";

export default function MusicButton(props) {
	const [isPlaying, setIsPlaying] = useState(false);
	return (
		<div>
			<button
				className={` ${props.className} music p-2 animate-pulse uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out`}
				onClick={() => setIsPlaying(!isPlaying)}
			>
				{isPlaying ? "MUSIC ON" : "MUSIC OFF"}
				{isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
			</button>
			<Sound
				url='/music/outrun.mp3'
				playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.PAUSED}
				playFromPosition={300}
				volume={15}
				loop={true}
				autoLoad={true}
			/>
		</div>
	);
}
