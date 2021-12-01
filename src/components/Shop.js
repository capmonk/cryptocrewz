import React from "react";
import Tile from "./Tile";
import { useState } from "react";
import Slider from "react-slick";
import Modal from "./Modal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import man1 from "../img/merch-m-1.jpg";
import women1 from "../img/merch-w-1.jpg";
import man2 from "../img/merch-m-2-unknown.jpg";
import women2 from "../img/merch-w-2.jpg";
import man3 from "../img/merch-m-3.jpg";
import women3 from "../img/merch-w-3.jpg";

const ClothSlider = () => {
	const images = [man1, women1, man2, women2, man3, women3];

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
	const [imgModal, setImgModal] = useState(false);

	const settings = {
		infinite: true,
		lazyload: true,
		focusOnSelect: true,
		speed: 300,
		slidesToShow: 3,
		centerMode: true,
		centerPadding: 0,
		swipeToSlide: true,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		beforeChange: (current, next) => setImageIndex(next),
		responsive: [
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 3,
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
								<img
									className='w-full'
									src={img}
									alt={img}
									onClick={() => setImgModal(true)}
								/>
							) : (
								<img className='w-full' src={img} alt={img} />
							)}
						</div>
					))}
				</Slider>
				<Modal off={() => setImgModal(false)} state={imgModal}>
					<img src={images[imageIndex]} alt='' />
				</Modal>
			</div>
		</>
	);
};

export default function Shop() {
	return (
		<>
			<div id='shop'>
				<h2 className='mb-16 text-left'>SHOP COMING SOON</h2>
				<ClothSlider />
				<div className='grid grid-cols-1 gap-8 pt-16 lg:grid-cols-1 auto-cols-auto'>
					<Tile accent={true}>
						<p>
							High quality urban streetwear; T-shirts, hoodies, caps and a 3D
							printed collectable of your very own unique individual NFT.
						</p>
						<p>
							Personalised Apparel Coming Soon Each 3D printed collectable will
							come stamped with your own crypto wallet key to match the NFT you
							have purchased.
						</p>
						<p>
							Streetwear will come optional with your own Ethereum wallet
							encryption key printed directly on the streetwear so you can
							flaunt your ETH address and NFT purchase.
						</p>
					</Tile>
				</div>
			</div>
		</>
	);
}
