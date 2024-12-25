import React from "react";
import { BannerData } from "../../../data/Data";
import CustomBanner from "../../widget/components/CustomBanner";

const Banner = () => {
  return (
      <div className="hidden lg:block md:block lg:pt-0 md:pt-20 overflow-y-auto">
          <CustomBanner
              data={
                  BannerData.map((item, index) => (
                      <div
                          key={index}
                          className=" bg-gradient-to-bl from-neutral-400 to-slate-900 w-screen"
                      >
                          <img src={item.image} alt="banner" className="mix-blend-overlay w-full"/>
                          <div className="absolute text-white lg:top-1/3 md:top-1/4 lg:ms-16 md:mx-10 top-0 ms-4 ">
                              <p className="font-bold tracking-tighter lg:text-6xl md:text-4xl text-2xl text-gray-100 ">
                                  {item.title}
                              </p>
                              <p className="lg:w-1/3 md:w-1/2 w-1/6 mt-5 lg:text-lg text-gray-300">{item.desc}</p>
                          </div>
                      </div>
                  ))
              }
          />
      </div>

  );
};
export default Banner;
