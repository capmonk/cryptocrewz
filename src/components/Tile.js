import React from "react";

export default function Tile(props) {
	return (
		<div className='relative h-full mb-10 last:mb-0'>
			<div
				className={`tile p-10 w-auto h-full flex flex-col justify-center items-center ${props.className}`}
			>
				<div
					className={`absolute z-0 w-full h-full bg-black bg-no-repeat bg-cover rounded-md opacity-20 md bg-blend-luminosity ${props.position}`}
					style={{ backgroundImage: `url(${props.bg})` }}
				></div>
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
