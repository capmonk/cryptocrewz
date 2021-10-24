import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nft from "../img/unknown.jpg";
import nft2 from "../img/unknown.jpg";
import nft3 from "../img/unknown.jpg";
import nft4 from "../img/unknown.jpg";
import nft5 from "../img/unknown.jpg";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

function NftSlider(props) {
	const images = [nft, nft2, nft3, nft4, nft5];

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

	const settings = {
		infinite: true,
		lazyload: true,
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
							<img src={img} alt={img} />
						</div>
					))}
				</Slider>
			</div>
		</div>
	);
}

export default NftSlider;
