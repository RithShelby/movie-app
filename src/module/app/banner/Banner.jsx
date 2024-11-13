import React from 'react';
import {Carousel} from "antd";
import {BannerData} from "../../../data/Data";
const Banner = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };
    return (
        <Carousel afterChange={onChange} className="">
            {BannerData.map((item) => (
                <div>
                    <img src={item.image} alt="banner" className="object-cover w-screen"/>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;