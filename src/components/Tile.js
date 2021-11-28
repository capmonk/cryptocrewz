import React from "react";

export default function Tile(props) {
	return (
		<div className='relative mb-10 last:mb-0 h-full'>
			<div
				className={`tile p-10 w-auto h-full flex flex-col justify-center items-center ${props.class}`}
			>
				<div>{props.children}</div>
			</div>
			{props.accent && (
				<>
					<div className='tile-accent tile-accent-1'></div>
				</>
			)}
		</div>
	);
}
