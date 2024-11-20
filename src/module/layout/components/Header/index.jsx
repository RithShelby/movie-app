import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../asset/image/Logo.png";
import { endData, navData } from "../../../../data/Data";
import CustomSearch from "../../../widget/components/CustomSearch";
import { CiSearch } from "react-icons/ci";
import { IoLogOutOutline } from "react-icons/io5";
import { useAuth } from "../../../auth/core/hook";

const HeaderApp = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { OnLogout } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40); // Adjust the scroll position to your preference
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`justify-center navbar hidden lg:flex text-slate-100 fixed text-xl transition-all duration-300 z-10 h-12
              ${isScrolled ? "mt-0" : " mt-10"}
            `}
    >
      <nav
        style={{
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
        className={`text-xl transition-all bg-transparent px-56 rounded-full ${
          isScrolled
            ? "backdrop-blur-sm rounded-none w-screen justify-center "
            : "backdrop-blur-lg"
        }`}
      >
        <img src={logo} alt="Logo" className="custom-logo " />
        <div className="flex font-bold">
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
        <div className="flex ms-5 font-bold">
          <CustomSearch
            placeholder="Search movie here"
            icon={<CiSearch />}
            type={"search"}
          />
          {endData.map((item, index) => (
            <Link key={index} className="flex items-center me-5" to={item.path}>
              <span className="text-3xl hover:text-2xl transition-all">
                {item.icon}
              </span>
            </Link>
          ))}
          <span
            className="text-3xl flex items-center hover:text-2xl transition-all"
            onClick={OnLogout}
          >
            <IoLogOutOutline />
          </span>
        </div>
      </nav>
    </div>
  );
};

export default HeaderApp;
