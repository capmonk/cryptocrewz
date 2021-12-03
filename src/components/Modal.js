import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Modal(props) {
	if (props.state === true) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflowY = "scroll";
	}

	return (
		<>
			{props.state && (
				<>
					<div className='modal-bg' onClick={props.off}></div>
					<div className='modal'>
						<button className='modal-close' onClick={props.off}>
							<AiFillCloseCircle />
						</button>
						<div className='mt-4'>{props.children}</div>
					</div>
				</>
			)}
		</>
	);
}
