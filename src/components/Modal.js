import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export default function Modal(props) {
	return (
		<>
			{props.state && (
				<>
					<div className='modal-bg' onClick={props.off}></div>
					<div className='modal'>
						<button className='modal-close' onClick={props.off}>
							<AiFillCloseCircle />
						</button>
						{props.children}
					</div>
				</>
			)}
		</>
	);
}
