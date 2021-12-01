import React from "react";

export default function Button(props) {
	return (
		<button
			className={` ${props.className} p-2 uppercase font-semibold mx-2 text-3xl border-2 border-solid flex flex-row justify-center items-center hover:scale-105 transition-all duration-300 ease-in-out`}
		>
			{props.icon} {props.text}
		</button>
	);
}
