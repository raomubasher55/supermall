import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from '../../assets/image1.png'
import image2 from '../../assets/image2.png'
import image3 from '../../assets/image3.png'
import image4 from '../../assets/image4.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './ProductCard.css';

import { Pagination, Autoplay , Scrollbar } from 'swiper/modules';

const ProductCard = () => {
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
                                    src={image1}
                                    className="w-[30%] md:w-[60%] h-auto rounded-lg object-cover  md:p-32 lg:p-36"
                                />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-12 flex flex-col gap-8 justify-start">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold"> Modren Glander Machine</h2>
                                <p className="text-lg md:text-xl lg:text-2xl font-semibold">12000 ₹</p>
                                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full whitespace-normal break-words">
                                Introducing the Glander Machine, an advanced and efficient tool designed for precision and reliability in industrial applications. Engineered with cutting-edge technology, this machine ensures optimal performance and durability for a wide range of tasks. Its robust construction and high-quality components provide consistent results and minimize downtime. Equipped with intuitive controls and adjustable settings, the Glander Machine offers flexibility to meet diverse operational needs. Ideal for manufacturing, assembly, and production environments, it combines innovation with efficiency to enhance productivity and quality                                 </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col md:flex-row  justify-center items-center p-4 md:p-8 lg:p-12 rounded-lg shadow-lg ">
                            <div className="w-[30%] md:w-1/2 mb-6 md:mb-0 flex justify-start">
                                <img
                                    aria-hidden="true"
                                    alt="Product Image"
                                    src={image2}
                                    className="w-full h-auto rounded-lg object-contain  md:p-12 lg:p-20"
                                />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-20 flex flex-col gap-8 justify-start">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Nike mens Jordan 1 Retro High Sneaker</h2>
                                <p className="text-lg md:text-xl lg:text-2xl font-semibold">8000 ₹</p>
                                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full">
                                Step into comfort and style with Snaker Shoes, where innovation meets fashion. Designed for all-day wear, these shoes feature a modern, sleek look with superior cushioning and support. Crafted from high-quality materials, Snaker Shoes offer a perfect blend of durability and flexibility, making them ideal for both casual outings and active lifestyles. The breathable fabric ensures your feet stay cool and dry, while the ergonomic design provides excellent arch support and a snug fit. Whether you're heading to the gym or a night out, Snaker Shoes provide the perfect combination of comfort, performance, and style.                                   </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col md:flex-row justify-center items-center p-4 md:p-8 lg:p-12 rounded-lg shadow-lg ">
                            <div className="w-[30%] md:w-1/2 mb-6 md:mb-0 flex justify-start">
                                <img
                                    aria-hidden="true"
                                    alt="Product Image"
                                    src={image3}
                                    className="w-full h-auto rounded-lg object-contain  md:p-12 lg:p-20"
                                />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-20 flex gap-8 flex-col justify-start">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Brown Snaker Shoes</h2>
                                <p className="text-lg md:text-xl lg:text-2xl font-semibold">5000 ₹</p>
                                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full">
                                Elevate your footwear collection with the Brown Snaker Shoes, combining classic style with modern comfort. These shoes feature a rich brown hue that adds a touch of sophistication to any outfit. Made from premium materials, they offer both durability and a luxurious feel. The cushioned insole and flexible outsole ensure all-day comfort, while the breathable design keeps your feet cool and dry. Whether you're dressing up for a formal occasion or going for a casual look, the Brown Snaker Shoes provide a versatile and stylish option that seamlessly blends with your wardrobe.                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col md:flex-row  justify-center items-center p-4 md:p-8 lg:p-12 rounded-lg shadow-lg ">
                            <div className="w-[30%] md:w-1/2 mb-6 md:mb-0 flex justify-start">
                                <img
                                    aria-hidden="true"
                                    alt="Product Image"
                                    src={image4}
                                    className="w-full h-auto rounded-lg object-contain  md:p-12 lg:p-36"
                                />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-20 flex gap-8 flex-col justify-start">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold"> MI Power Bank</h2>
                                <p className="text-lg md:text-xl lg:text-2xl font-semibold">8000 ₹</p>
                                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full">
                                Stay powered up on the go with the MI Power Bank, a compact and reliable portable charger designed to keep your devices charged wherever you are. Featuring a high-capacity battery, this power bank ensures you have enough power to last through your busy day. Its sleek, lightweight design makes it easy to carry in your pocket or bag, while the advanced safety features protect against overcharging and overheating. With multiple output ports, the MI Power Bank can charge multiple devices simultaneously, making it a perfect companion for travel, work, and everyday use. Experience convenience and reliability with the MI Power Bank.
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>

      </>
  );
};

export default ProductCard;