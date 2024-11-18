import React from 'react';
import { Carousel } from 'antd';
import { BannerData } from '../../../data/Data';
import {IoPlay} from "react-icons/io5";
import {Link} from "react-router-dom";

const Banner = () => {
    const onChange = (currentSlide) => {
        console.log(currentSlide);
    };

    return (
        <Carousel autoplay afterChange={onChange}>
            {BannerData.map((item, index) => (
                <div key={index} className="relative bg-gradient-to-bl from-neutral-400 to-slate-900">
                    <img
                        src={item.image}
                        alt="banner"
                        className="mix-blend-overlay"
                    />
                    <div className="absolute lg:top-1/3 md:top-1/4 text-white md:ms-16 top-5 ms-4">
                        <text className="lg:text-6xl font-bold tracking-tighter text-xl">{item.title}</text>
                        <p className="mt-5 lg:text-lg w-1/3">{item.desc}</p>
                        <button className="btn rounded lg:w-1/6 w-1/4 mt-5"><IoPlay /><p>Trailer</p></button>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;
