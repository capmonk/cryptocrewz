import React from "react";
import { FaTwitter } from "react-icons/fa";

function Team(props) {
	return (
		<div className="container sec-pad">
			<h2 className="text-center">{props.title}</h2>
			<div className="row g-5">
				<div className="col-lg-4 team-card f-col align-items-center">
					<img className="shadow" src={props.monk} alt="CapitalistMonk" />
					<p>CapitalistMonk</p>
					<a
						href="https://twitter.com/MonkCapitalist"
						className="social"
						target="_blank"
						rel="noreferrer"
					>
						<FaTwitter />
					</a>
				</div>
				<div className="col-lg-4 team-card f-col align-items-center">
					<img className="shadow" src={props.anise} alt="Anise K" />
					<p>Anise K</p>
					<a
						href="https://twitter.com/Anisekmusic"
						className="social"
						target="_blank"
						rel="noreferrer"
					>
						<FaTwitter />
					</a>
				</div>
				<div className="col-lg-4 team-card f-col align-items-center">
					<img className="shadow" src={props.gsd} alt="GSD Club" />
					<p>GSD Club</p>
				</div>
			</div>
		</div>
	);
}

export default Team;
