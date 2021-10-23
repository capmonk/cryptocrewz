import React from "react";

function Modal({ closeModal }) {
	return (
		<div className="modal-bg">
			<div className="modal-wrapper container">
				<button className="close" onClick={() => closeModal(false)}>
					X
				</button>
				<h2>Terms & Conditions</h2>
				<p className="mx-0">Terms</p>
			</div>
		</div>
	);
}

export default Modal;
