import React from "react";

function Row(props) {
	return (
		<div
			className={`bg-contain container ${props.bgPosition}`}
			style={{ backgroundImage: `url(${props.bgImg})` }}
		>
			<div
				className={`content-row f-col justify-content-center ${props.rowPosition}`}
			>
				<div className="content">
					<h2>{props.title}</h2>
					<p className="m-0">{props.content}</p>
				</div>
			</div>
		</div>
	);
}

export default Row;
