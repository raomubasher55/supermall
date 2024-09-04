import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import superMallimg from '../assets/supermall.jpg';
import flexImg from '../assets/flex.jpg';
import girlImg from '../assets/girl.png';
import amazonSlideImg from '../assets/amazonslide.jpg';
import SlidMan from '../assets/slideMan.jpg';
import topPthn from '../assets/topPthm.jpg';

      // const stripe = await loadStripe('pk_test_51PrdT1P3NC7isVfIIwTTHH32Z5PnhyGQLbKy1k9XJYCDHqyxiA4uQxBuXRTmLAcEuYhp5KEcRT0dAu3GfznZpBwg00wCF0ALII');



function Slider() {
  return (
    <Carousel className='Slide' controls={false} indicators={false}>
      <Carousel.Item interval={2000}>
        <img
          className="slide-img d-block w-100"
          src={superMallimg}
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
          className="slide-img d-block w-100"
          src={flexImg}
          alt="Second slide"
        />
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
          className="slide-img d-block w-100"
          src={girlImg}
          alt="Third slide"
        />
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
          className="slide-img d-block w-100"
          src={amazonSlideImg}
          alt="fouth slide"
        />
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
          className="slide-img d-block w-100"
          src={SlidMan}
          alt="fifth slide"
        />
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
          className="slide-img d-block w-100"
          src={topPthn}
          alt="sixth slide"
        />
      </Carousel.Item>

    </Carousel>
  );
}

export default Slider;
