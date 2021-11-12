import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nft from "../img/slider/SliderWeb1.png";
import nft2 from "../img/slider/SliderWeb2.png";
import nft3 from "../img/slider/SliderWeb3.png";
import nft4 from "../img/slider/SliderWeb4.png";
import nft5 from "../img/slider/SliderWeb5.png";
import nft6 from "../img/slider/SliderWeb6.png";
import nft7 from "../img/slider/SliderWeb7.png";
import nft8 from "../img/slider/SliderWeb8.png";
import nft9 from "../img/slider/SliderWeb9.png";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function NftSlider(props) {
	const images = [nft, nft2, nft3, nft4, nft5, nft6, nft7, nft8, nft9];

	const NextArrow = ({ onClick }) => {
		return (
			<div className="arrow next" onClick={onClick}>
				<FaArrowRight />
			</div>
		);
	};

	const PrevArrow = ({ onClick }) => {
		return (
			<div className="arrow prev" onClick={onClick}>
				<FaArrowLeft />
			</div>
		);
	};

	const [imageIndex, setImageIndex] = useState(0);
	const [imgModal, setImgModal] = useState(false);

	const settings = {
		infinite: true,
		lazyload: true,
		focusOnSelect: true,
		speed: 300,
		slidesToShow: 3,
		centerMode: true,
		centerPadding: 0,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		beforeChange: (current, next) => setImageIndex(next),
	};

	return (
		<div className="container">
			<div className="slider">
				<Slider {...settings}>
					{images.map((img, index) => (
						<div
							className={index === imageIndex ? "slide activeSlide" : "slide"}
						>
							<img src={img} alt={img} onClick={() => setImgModal(true)} />
						</div>
					))}
				</Slider>
				<div>
					<div
						className="lightbox-bg"
						onClick={() => setImgModal(false)}
						id={imgModal === true ? "showModal" : "hideModal"}
					></div>
					<div
						className="lightbox"
						id={imgModal === true ? "showModal" : "hideModal"}
					>
						<button
							className="lightbox-close"
							onClick={() => setImgModal(false)}
						>
							X
						</button>
						{/* <PrevArrow /> */}
						<img src={images[imageIndex]} alt="" />
						{/* <NextArrow /> */}
					</div>
				</div>
			</div>
		</div>
	);
}

export default NftSlider;
