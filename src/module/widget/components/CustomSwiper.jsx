import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import "swiper/css/free-mode";

const CustomSwiper = ({ data }) => {
    return (
        <Swiper
            spaceBetween={10}
            centeredSlides={null}
            breakpoints={{
                360: {
                    slidesPerView: 4, // Small screens (>= 640px)
                    spaceBetween: 10,
                },
                428: {
                    slidesPerView: 4, // Small screens (>= 640px)
                    spaceBetween: 5,
                },
                510: {
                    slidesPerView: 4, // Small screens (>= 640px)
                    spaceBetween: 5,
                },
                768: {
                    slidesPerView: 4, // Small screens (>= 640px)
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 3, // Medium screens (>= 768px)
                    spaceBetween: 10,
                },
                1280: {
                    slidesPerView: 4, // Medium screens (>= 768px)
                    spaceBetween: 10,
                },
                1440: {
                    slidesPerView: 4, // Medium screens (>= 768px)
                    spaceBetween: 10,
                },
                2560: {
                    slidesPerView: 7, // Medium screens (>= 768px)
                    spaceBetween: 10,
                },
            }}
        >
            {data.map((item, index) => (
                <SwiperSlide key={index} className="">{item}</SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CustomSwiper;
