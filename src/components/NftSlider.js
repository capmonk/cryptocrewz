import React from "react";
import { useState } from "react";
import Slider from "react-slick";
// import Modal from "./Modal";
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
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

function NftSlider(props) {
	const images = [nft, nft2, nft3, nft4, nft5, nft6, nft7, nft8, nft9];

	const NextArrow = ({ onClick }) => {
		return (
			<div className='arrow next' onClick={onClick}>
				<IoMdArrowDropright />
			</div>
		);
	};

	const PrevArrow = ({ onClick }) => {
		return (
			<div className='arrow prev' onClick={onClick}>
				<IoMdArrowDropleft />
			</div>
		);
	};

	const [imageIndex, setImageIndex] = useState(0);
	// const [imgModal, setImgModal] = useState(false);

	const settings = {
		infinite: true,
		lazyload: true,
		focusOnSelect: true,
		speed: 300,
		dots: true,
		arrows: false,
		slidesToShow: 3,
		centerMode: true,
		centerPadding: 0,
		swipeToSlide: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		appendDots: (dots) => (
			<div>
				<ul style={{ margin: "0px" }}> {dots} </ul>
			</div>
		),
		customPaging: (i) => (
			<div className='w-full mt-4'>
				<div className='w-8 h-2 bg-white bg-opacity-50 bar'></div>
				<div className='hidden'>{i + 1}</div>
			</div>
		),
		beforeChange: (current, next) => setImageIndex(next),
		responsive: [
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					focusOnSelect: true,
					swipeToSlide: true,
					lazyload: true,
					speed: 300,
					infinite: true,
					dots: true,
					autoplay: true,
					arrows: false,
				},
			},
		],
	};

	return (
		<>
			<div className='slider'>
				<Slider {...settings}>
					{images.map((img, index) => (
						<div
							className={index === imageIndex ? "slide activeSlide" : "slide"}
						>
							{index === imageIndex ? (
								<img src={img} alt={img} />
							) : (
								<img src={img} alt={img} />
							)}
						</div>
					))}
				</Slider>
				{/* <Modal off={() => setImgModal(false)} state={imgModal}>
					<img src={images[imageIndex]} alt='' />
				</Modal> */}
			</div>
		</>
	);
}

export default NftSlider;
