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
          className=" bg-gradient-to-bl from-neutral-400 to-slate-900 w-screen"
        >
          <img src={item.image} alt="banner" className="mix-blend-overlay w-screen" />
          <div className="absolute text-white lg:top-1/3 md:top-1/4 lg:ms-16 md:mx-10 top-0 ms-4 ">
            <text className="font-bold tracking-tighter lg:text-6xl text-2xl ">
              {item.title}
            </text>
            <p className="lg:w-1/3 md:w-1/4 w-1/6 mt-5 lg:text-lg text-gray-200">{item.desc}</p>
            <button className="lg:flex md:flex rounded btn lg:w-1/5 lg:mt-5 md:w-1/5 md:mt-5 hidden">
              <IoPlay />==
              <p>Trailer</p>
            </button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};
export default Banner;
