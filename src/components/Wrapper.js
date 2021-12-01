import React from "react";

export default function Wrapper(props) {
	return <div className='py-20 md:py-24'>{props.children}</div>;
}
