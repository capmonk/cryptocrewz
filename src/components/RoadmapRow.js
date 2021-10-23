import React from "react";

function RoadmapRow(props) {
	return (
		<div className="map-row">
			<h2 className="mb-3">{props.number}</h2>
			<h2 className="mb-3">{props.title}</h2>
			<p>{props.p1}</p>
			<p>{props.p2}</p>
		</div>
	);
}

export default RoadmapRow;
