import React from "react";

function Cta(props) {
	return (
		<div className="cta f-c f-col">
			<h2>{props.title}</h2>
			<p>{props.paragraph}</p>
			<h3>{props.closing}</h3>
		</div>
	);
}

export default Cta;
