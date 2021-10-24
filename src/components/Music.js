import React from "react";
import { useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import Sound from "react-sound";
import Outrun from "../outrun.mp3";

function Mute({ muteMusic }) {
	const [isPlaying, setIsPlaying] = useState(true);

	return (
		<div>
			<button className="mute" onClick={() => setIsPlaying(!isPlaying)}>
				{isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
			</button>
			<Sound
				url={Outrun}
				playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
				playFromPosition={300}
				volume={15}
				loop={true}
				autoLoad={true}
			/>
		</div>
	);
}

export default Mute;
