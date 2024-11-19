import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../../../../asset/image/Logo.png";
import { endData, navData } from "../../../../data/Data";
import CustomSearch from "../../../widget/components/CustomSearch";
import {CiSearch} from "react-icons/ci";

const HeaderApp = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40); // Adjust the scroll position to your preference
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`justify-center navbar hidden lg:flex text-slate-100 fixed text-xl transition-all duration-300 bg-transparent z-10  
            ${isScrolled ? "backdrop-blur mt-0" : "backdrop-blur-sm"}`}>
            <img src={logo} alt="Logo" className="custom-logo"/>
            <div className="flex font-bold">
                {navData.map((item, index) => (
                    <Link key={index} to={item.path} className="flex justify-center items-center text-center">
                        <span className="text-3xl px-4">{item.icon}</span>
                        <span
                            className="hover:font-light transition-all hover:border-b border-slate-500">
                                {item.title}
                            </span>
                    </Link>
                ))}
            </div>
            <div className="flex ms-5 font-bold">
                <CustomSearch placeholder="Search movie here" icon={<CiSearch/>} type={"search"}/>
                {endData.map((item, index) => (
                    <Link key={index} className="flex items-center mx-2" to={item.path}>
                        <span className="text-3xl hover:text-2xl transition-all">{item.icon}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default HeaderApp;
