import React from "react";
import { FaDiscord, FaTwitter } from "react-icons/fa";

function Join(props) {
	return (
		<div className="container nft-gif">
			<div className="row g-5">
				<div className="col-lg-5 f-c">
					<a href={props.link} target="_blank" rel="noreferrer">
						<button className="cus-btn">{props.btn}</button>
					</a>
				</div>
				<div className="col-lg-7">
					<h2>{props.title}</h2>
					<p className="m-0 mb-4">{props.content}</p>
					<div className="f">
						<a
							className="social"
							href={props.discord}
							target="_blank"
							rel="noreferrer"
						>
							<FaDiscord />
						</a>
						<a
							className="social"
							href={props.twitter}
							target="_blank"
							rel="noreferrer"
						>
							<FaTwitter />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Join;
