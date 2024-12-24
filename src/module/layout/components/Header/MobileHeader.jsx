import React, {useState} from 'react';
import {SlSettings} from "react-icons/sl";
import {CiSearch} from "react-icons/ci";
import {mobileNavData} from "../../../../data/Data";
import {Link} from "react-router-dom";
import LocalStorage from "../../../../helper/LocalStorage";
const MobileHeader = () => {
    const [active,setActive] = useState(0);
    const [user, setUser] = useState(null); // User data from localStorage
    const handleActive = (e) => {
        setActive(e);
    }
    return (
        <div className="lg:hidden flex">
            <LocalStorage setData={setUser} />
            {/* Top navigation bar */}
            <nav className="fixed top-0 inset-x-0 bg-gradient-to-b to-zinc-900 from-slate-900 text-white z-50">
                <div className="flex justify-between items-center p-4">
                    <span>
                        {user && (<p className="text-xl">Hello , {user.name} 👋</p>)}
                        <p className="font-extralight text-gray-400 text-lg">Enjoy your booking time !</p>
                    </span>
                    <span className="flex">
                        {/*<CiSearch className="text-3xl me-4" />*/}
                        <Link to="/user"><SlSettings className="text-3xl" /></Link>
                    </span>
                </div>
            </nav>
            {/* Bottom navigation bar */}
            <nav className="fixed bottom-0 inset-x-0 backdrop-blur-lg z-50 mx-5 my-3 rounded-3xl shadow-lg shadow-gray-500">
                <div className="flex justify-evenly items-center p-4 text-white font-bold ">
                    {mobileNavData.map((item,index) => (
                        <Link key={index} to={item.path} className="border-0 transition-transform duration-500 ease-in-out hover:scale-125" onClick={() => handleActive(index)}>
                           <span
                               className={`flex flex-col items-center text-lg  ${
                                   active === index ? "border-b border-blue-500 " : ""
                               }`}
                           >
                                <i className="text-3xl">{item.icon}</i>
                                <p className="font-bold text-xl">{item.title}</p>
                              </span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default MobileHeader;
