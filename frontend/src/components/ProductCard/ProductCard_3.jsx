import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import image9 from '../../assets/image9.png'
import image10 from '../../assets/image10.png'
import image11 from '../../assets/image11.png'
import image12 from '../../assets/image12.png'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './ProductCard.css';

import { Pagination, Autoplay, Scrollbar } from 'swiper/modules';

const ProductCard_3 = () => {
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
                                    src={image9}
                                    className="w-[30%] md:w-[60%] h-auto rounded-lg object-cover  md:p-32 lg:p-36"
                                />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-12 flex flex-col gap-8 justify-start">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Black AirPods A6</h2>
                                <p className="text-lg md:text-xl lg:text-2xl font-semibold">15000 ₹</p>
                                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full whitespace-normal break-words">
                                Experience the ultimate in wireless audio with the Black AirPods A6. Designed with a sleek, modern aesthetic, these AirPods offer crystal-clear sound quality, deep bass, and intuitive touch controls. Perfect for on-the-go listening, the A6 features long battery life, seamless pairing with your devices, and a comfortable fit that stays secure all day. Whether you're taking calls, working out, or just relaxing, the Black AirPods A6 deliver a premium listening experience in a compact, stylish package.                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col md:flex-row  justify-center items-center p-4 md:p-8 lg:p-12 rounded-lg shadow-lg ">
                            <div className="w-[30%] md:w-1/2 mb-6 md:mb-0 flex justify-start">
                                <img
                                    aria-hidden="true"
                                    alt="Product Image"
                                    src={image10}
                                    className="w-full h-auto rounded-lg object-contain  md:p-12 lg:p-20"
                                />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-20 flex flex-col gap-8 justify-start">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Sesa Ayurvedic Oil and Shampoo 
                                </h2>
                                <p className="text-lg md:text-xl lg:text-2xl font-semibold">4000 ₹</p>
                                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full">
                                SESA Hair Shampoo is a premium solution designed to nourish and strengthen your hair with every wash. Infused with a blend of natural herbs and essential oils, this shampoo promotes healthy scalp and hair growth while adding a natural shine. Its gentle formula cleanses without stripping away essential moisture, making it ideal for all hair types. Enriched with vitamins and antioxidants, SESA Hair Shampoo helps to reduce dandruff, prevent hair fall, and maintain a balanced scalp environment. Enjoy the refreshing scent and the luxurious feel of healthier, more vibrant hair. </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col md:flex-row justify-center items-center p-4 md:p-8 lg:p-12 rounded-lg shadow-lg ">
                            <div className="w-[30%] md:w-1/2 mb-6 md:mb-0 flex justify-start">
                                <img
                                    aria-hidden="true"
                                    alt="Product Image"
                                    src={image11}
                                    className="w-full h-auto rounded-lg object-contain  md:p-12 lg:p-20"
                                />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-20 flex gap-8 flex-col justify-start">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Himderm Soap</h2>
                                <p className="text-lg md:text-xl lg:text-2xl font-semibold">1500 ₹</p>
                                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full">
                                Himderm Soap is a luxurious and gentle cleansing bar designed to provide your skin with a soothing and rejuvenating experience. Formulated with natural ingredients, this soap helps to effectively cleanse and purify your skin while maintaining its natural moisture balance. Infused with nourishing elements, it promotes healthy, radiant skin by removing impurities and leaving your skin feeling soft and refreshed. Ideal for daily use, Himderm Soap is suitable for all skin types, including sensitive skin, and helps to enhance your skin's overall appearance and texture.</div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div className="flex flex-col md:flex-row  justify-center items-center p-4 md:p-8 lg:p-12 rounded-lg shadow-lg ">
                            <div className="w-[30%] md:w-1/2 mb-6 md:mb-0 flex justify-start">
                                <img
                                    aria-hidden="true"
                                    alt="Product Image"
                                    src={image12}
                                    className="w-full h-auto rounded-lg object-contain  md:p-12 lg:p-36"
                                />
                            </div>
                            <div className="w-full md:w-1/2 md:pl-6 pt-8 md:pt-12 lg:pt-20 flex gap-8 flex-col justify-start">
                                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">9Am Tomato Ketchup</h2>
                                <p className="text-lg md:text-xl lg:text-2xl font-semibold">850 ₹</p>
                                <div className="text-sm md:text-base lg:text-lg flex-grow max-w-full">
                                Add a burst of flavor to your meals with our rich and tangy Tomato Ketchup. Crafted from the finest, ripe tomatoes, this ketchup delivers a perfect balance of sweetness and acidity, enhancing the taste of burgers, fries, sandwiches, and more. Our recipe is made with high-quality ingredients and contains no artificial preservatives or colors. Whether you're grilling, dipping, or cooking, this Tomato Ketchup is a versatile condiment that adds a delicious, savory kick to your favorite dishes.
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>


        </>
    )
}

export default ProductCard_3
