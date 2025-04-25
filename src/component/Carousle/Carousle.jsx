import React from "react";
import Carousel from "nuka-carousel";
import mainPhoto1 from "../../assets/images/mainPhoto1.jpeg"
function MyCarousel() {
  return (
    <Carousel>
      <img src={mainPhoto1} alt="slide1" />
      <img src="https://placehold.co/600x400?text=Слайд+2" alt="slide2" />
      <img src="https://placehold.co/600x400?text=Слайд+3" alt="slide3" />
    </Carousel>
  );
}

export default MyCarousel;