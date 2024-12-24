import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import "../../../asset/css/index.css"
 const CustomBanner =({data})=> {
    return (
        <Swiper
            spaceBetween={30}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
        >
            {data.map((item, index) => (
                <SwiperSlide key={index} className="">{item}</SwiperSlide>
            ))}
        </Swiper>
    );
}
export default CustomBanner;
