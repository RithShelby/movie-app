import React, {useEffect} from "react";
import {useTheater} from "./core/hook";
import {useSelector} from "react-redux";
import ScrollToTop from "../../../helper/ScrollTop";

const CinemaPage = () => {
  const {TheaterList} = useSelector((state) => state.TheaterList);
  console.log(TheaterList)
  const {getTheater} = useTheater();
  useEffect(() => {
    getTheater();
  }, []);
  return (
      <div className="lg:py-40 md:py-36 text-center text-white bg-gradient-to-br from-zinc-900 to-slate-900 overflow-y-auto h-screen pb-32 pt-10">
          <ScrollToTop/>
        <p className="text-4xl font-bold text-sky-400">Watcher's Hall</p>
          <p className="my-10 tracking-wider lg:mx-56 md:mx-10 mx-5 text-lg leading-8 text-gray-300 text-start">We now have only 3 exclusive halls, each offering a unique cinematic experience! With limited seats available, make sure to book your tickets before they're gone. Enjoy the best sound, comfortable seating,
              and the latest movies in a premium setting. Don't miss out—reserve your spot now and experience movie magic like never before!
          </p>
          <div className="grid gap-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:px-10">
              {TheaterList.map((item) => (
                  <div className="relative mx-3 transition ease-in-out duration-500 hover:scale-95 ">
                      <img src={item.theaterImg} className="w-full rounded-2xl m-auto filter brightness-75 shadow-lg shadow-sky-400" alt={item.theaterImg}/>
                      <div className="absolute inset-0 flex justify-center items-end text-center bg-transparent rounded-2xl p-1 ">
                          <div className="backdrop-blur-sm flex items-center w-full justify-evenly rounded-2xl py-5">
                              <p className="text-xl font-bold underline">{item.hall}</p>
                              <span className="flex items-center font-bold">Screen :
                                  <p className="ms-1 text-sky-400">{item.name.label}</p>
                              </span>
                          </div>
                      </div>
                  </div>

              ))}
          </div>
      </div>
  )
};

export default CinemaPage;
