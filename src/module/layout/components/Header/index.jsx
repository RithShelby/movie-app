import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { endData, navData } from "../../../../data/Data";

const HeaderApp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 300); // Adjust the scroll position to your preference
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`navbar hidden lg:flex justify-center items-center text-slate-100 fixed text-xl transition-all duration-300 z-10 w-full
              ${isScrolled ? "m-0 p-0" : " py-5"}
            `}>
      <nav style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }} className={`text-xl transition-all bg-transparent px-56 rounded-full py-5 ${
          isScrolled
            ? "backdrop-blur-sm rounded-none w-screen justify-center "
            : "backdrop-blur-lg"
        }`}
      >
        <Link to="/" className="font-bold text-2xl">Watcher</Link>
        {/*mid nav data*/}
        <div className="flex font-bold mx-20">
          {navData.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex justify-center items-center text-center"
            >
              <span className="text-3xl px-4">{item.icon}</span>
              <span className="hover:font-light transition-all hover:border-b border-slate-500">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
        {/*end nav data*/}
        <div className="flex font-bold">
          {endData.map((item, index) => (
            <Link key={index} className="flex items-center me-5" to={item.path}>
              <span className="flex flex-col items-center transition-all">
                  <i className="text-2xl"> {item.icon}</i>
                  <p className="font-extralight text-lg">{item.title}</p>
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default HeaderApp;
