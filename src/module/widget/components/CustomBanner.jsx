import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
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
