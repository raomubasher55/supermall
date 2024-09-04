import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import image5 from '../../assets/image5.png'
import image6 from '../../assets/image6.png'
import image7 from '../../assets/image7.png'
import image8 from '../../assets/image8.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './ProductCard.css';

import { Pagination, Autoplay ,Scrollbar } from 'swiper/modules';
const ProductCard_2 = () => {
  return (
    <>
      <div className='md:w-[790px] lg:w-[1100px]  sm:w-[615px] w-[375px]'>
        <Swiper
          scrollbar={{ hide: true }}
          autoplay={{
            delay: 1000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Scrollbar]}
          className="mySwiper "
        >
          <SwiperSlide>
            <div className="flex flex-col md:flex-row  md:w-full  justify-center  items-center p-4 md:p-8 lg:p-12 rounded-lg shadow-lg">
              <div className="w-[30%] md:w-1/2 mb-6 md:mb-0 flex justify-start">
                <img
                  aria-hidden="true"
                  alt="Product Image"
                  src={image5}
                  className="w-[30%] md:w-[60%] h-auto rounded-lg object-cover  md:p-32 lg:p-36"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-12 flex flex-col gap-8 justify-start">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold"> GoPro Camera</h2>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold">17000 ₹</p>
                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full whitespace-normal break-words">
                Unleash your adventurous side with the GoPro Camera, engineered to capture every moment with exceptional clarity and durability. Designed for action-packed environments, this camera offers high-resolution video and photo capabilities, ensuring vibrant and detailed footage even in challenging conditions. With features like advanced image stabilization, waterproofing, and rugged construction, the GoPro Camera is perfect for outdoor activities, sports, and travel. Its compact size and versatile mounting options make it easy to take anywhere, while the intuitive controls and connectivity features allow for seamless sharing and editing of your content. Whether you’re diving underwater or scaling a mountain, the GoPro Camera is your ultimate companion for capturing extraordinary moments.                               </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col md:flex-row  justify-center items-center p-4 md:p-8 lg:p-12 rounded-lg shadow-lg ">
              <div className="w-[30%] md:w-1/2 mb-6 md:mb-0 flex justify-start">
                <img
                  aria-hidden="true"
                  alt="Product Image"
                  src={image6}
                  className="w-full h-auto rounded-lg object-contain  md:p-12 lg:p-20"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-20 flex flex-col gap-8 justify-start">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Mamaearth Multani Mitti Face Wash</h2>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold">8000 ₹</p>
                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full">
                Revitalize your skin with Mamaearth Multani Mitti Face Wash, a refreshing and natural cleanser designed to purify and rejuvenate your complexion. Enriched with the goodness of Multani Mitti (Fuller's Earth), this face wash gently removes impurities, excess oil, and dirt, leaving your skin feeling clean and refreshed. The natural ingredients help to unclog pores and balance skin tone, promoting a healthy and radiant glow. Ideal for daily use, it caters to all skin types and is free from harmful chemicals, ensuring a gentle yet effective cleansing experience. Pamper your skin with Mamaearth’s Multani Mitti Face Wash and embrace a fresh, radiant look.</div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col md:flex-row justify-center items-center p-4 md:p-8 lg:p-12 rounded-lg shadow-lg ">
              <div className="w-[30%] md:w-1/2 mb-6 md:mb-0 flex justify-start">
                <img
                  aria-hidden="true"
                  alt="Product Image"
                  src={image7}
                  className="w-full h-auto rounded-lg object-contain  md:p-12 lg:p-20"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-20 flex gap-8 flex-col justify-start">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold"> Pascal Watch</h2>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold">5000 ₹</p>
                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full">
                Experience timeless elegance with the Pascal Watch, a sophisticated timepiece that blends classic design with modern functionality. Crafted with precision, this watch features a sleek stainless steel case and a refined dial, exuding both luxury and durability. The high-quality movement ensures accurate timekeeping, while the stylish design complements any outfit, from formal to casual. Equipped with features such as a date function and luminous hands, the Pascal Watch is not only a statement of style but also a practical accessory for everyday use. Elevate your wristwear collection with the Pascal Watch, where craftsmanship meets contemporary style                   </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col md:flex-row  justify-center items-center p-4 md:p-8 lg:p-12 rounded-lg shadow-lg ">
              <div className="w-[30%] md:w-1/2 mb-6 md:mb-0 flex justify-start">
                <img
                  aria-hidden="true"
                  alt="Product Image"
                  src={image8}
                  className="w-full h-auto rounded-lg object-contain  md:p-12 lg:p-36"
                />
              </div>
              <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-20 flex gap-8 flex-col justify-start">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold"> Versace Golden Watch</h2>
                <p className="text-lg md:text-xl lg:text-2xl font-semibold">8000 ₹</p>
                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full">
                Make a bold statement with the Versace Watch, a symbol of opulence and sophistication. This exquisite timepiece combines iconic design with exceptional craftsmanship, featuring a striking dial adorned with the signature Medusa logo. The high-quality materials, including stainless steel and genuine leather, ensure both durability and luxury. With precise Swiss movement, the Versace Watch offers unparalleled accuracy and reliability. Its elegant design and attention to detail make it a perfect accessory for both formal occasions and everyday wear. Elevate your style with the Versace Watch, where timeless elegance meets contemporary flair.
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

    </>
  )
}

export default ProductCard_2
