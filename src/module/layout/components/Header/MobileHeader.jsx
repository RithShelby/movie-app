import React, {useState} from 'react';
import {SlSettings} from "react-icons/sl";
import {CiSearch} from "react-icons/ci";
import {mobileNavData} from "../../../../data/Data";
import {Link} from "react-router-dom";
const MobileHeader = () => {
    const [active,setActive] = useState(0);
    const handleActive = (e) => {
        setActive(e);
    }
    return (
        <div className="lg:hidden flex">
            {/* Top navigation bar */}
            <nav className="fixed top-0 inset-x-0 bg-gradient-to-b to-zinc-900 from-slate-900 text-white z-50">
                <div className="flex justify-between items-center p-4">
                    <span className="">
                        <p className="font-bold text-xl"> Hello User 👋 </p>
                        <p className="font-light text-gray-400">Enjoy your booking time !</p>
                    </span>
                    <span className="flex">
                        <CiSearch className="text-3xl me-4" />
                        <SlSettings className="text-3xl" />
                    </span>
                </div>
            </nav>
            {/* Bottom navigation bar */}
            <nav className="fixed bottom-0 inset-x-0 backdrop-blur-lg z-50 mx-5 my-3 rounded-md shadow-lg shadow-gray-500">
                <div className="flex justify-evenly items-center p-4 text-white">
                    {mobileNavData.map((item,index) => (
                        <Link key={index} to={item.path} className="border-0" onClick={() => handleActive(index)}>
                           <span
                               className={`flex flex-col items-center ${
                                   active === index ? "shadow-lg shadow-sky-400" : ""
                               }`}
                           >
                                <i className="text-2xl">{item.icon}</i>
                                <p>{item.title}</p>
                              </span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default MobileHeader;
