import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logo from "../../../../asset/image/Logo.png";
import { endData, navData } from "../../../../data/Data";
import CustomSearch from "../../../widget/components/CustomSearch";

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
        <nav
            className={`navbar rounded-full text-white justify-center fixed z-10 text-xl transition-all duration-300 bg-transparent 
            ${isScrolled ? "backdrop-blur-md mt-0" : "mt-2 backdrop-blur-sm "}`}
        >
            <div>
                <img src={logo} alt="Logo" className="custom-logo" />
                <div className="flex mx-10">
                    {navData.map((item, index) => (
                        <Link key={index} to={item.path} className="flex justify-center items-center text-center">
                            <span className="text-3xl px-4">{item.icon}</span>
                            <span className="font-light hover:font-bold transition-all hover:border-b border-slate-500">
                                {item.title}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className="flex">
                    <CustomSearch />
                    {endData.map((item, index) => (
                        <Link key={index} className="flex items-center" to={item.path}>
                            <span className="text-3xl">{item.icon}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default HeaderApp;
