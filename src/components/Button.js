import React from "react";

export default function Button(props) {
	return (
		<button
			className={`py-1 px-2 uppercase font-semibold mx-2 text-base rounded-sm flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out ${props.color}`}
		>
			{props.icon} {props.text}
		</button>
	);
}
