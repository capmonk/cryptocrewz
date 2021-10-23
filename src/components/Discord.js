import React from "react";
import { FaDiscord } from "react-icons/fa";

function Discord(props) {
	return (
		<div className="container sec-pad f-c f-col">
			<h2>{props.title}</h2>
			<p className="m-0 mb-4 text-center">{props.content}</p>
			<a
				className="social"
				href={props.discord}
				target="_blank"
				rel="noreferrer"
			>
				<FaDiscord />
			</a>
		</div>
	);
}

export default Discord;
