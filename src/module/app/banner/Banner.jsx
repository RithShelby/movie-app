import React from "react";
import { Carousel } from "antd";
import { BannerData } from "../../../data/Data";
import { IoPlay } from "react-icons/io5";

const Banner = () => {
  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };

  return (
    <Carousel autoplay afterChange={onChange}>
      {BannerData.map((item, index) => (
        <div
          key={index}
          className=" bg-gradient-to-bl from-neutral-400 to-slate-900"
        >
          <img src={item.image} alt="banner" className="mix-blend-overlay" />
          <div className="absolute text-white lg:top-1/3 md:top-1/4 md:ms-16 top-5 ms-4">
            <text className="text-xl font-bold tracking-tighter lg:text-6xl">
              {item.title}
            </text>
            <p className="w-1/3 mt-5 lg:text-lg">{item.desc}</p>
            <button className="w-1/4 mt-5 rounded btn lg:w-1/6">
              <IoPlay />
              <p>Trailer</p>
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
export default Banner;
