import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FreeMode } from "swiper/modules";
import "swiper/css/free-mode";

const CustomSwiper = ({ data }) => {
    return (
        <div className="">
            <Swiper
                spaceBetween={10}
                modules={[FreeMode]}
                freeMode={true} // Enable free mode for smoother scrolling
                breakpoints={{
                    510: {
                        slidesPerView: 2, // Small screens (>= 640px)
                        spaceBetween: 5,
                    },
                    768: {
                        slidesPerView: 3, // Small screens (>= 640px)
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
                    <SwiperSlide key={index}>{item}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CustomSwiper;
