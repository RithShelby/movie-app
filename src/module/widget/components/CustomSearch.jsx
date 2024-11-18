import React from 'react';
import {CiSearch} from "react-icons/ci";

const CustomSearch = ({searchTerm,handleSearch}) => {
    return (
        <div className="flex items-center relative active:border-b transition-all hover:border-b hover:me-5 ">
            <input value={searchTerm} onChange={handleSearch} type="search" className="bg-transparent rounded-2xl ps-10 py-2 focus:outline-none focus:ring-0 focus:border-b focus:rounded-none focus:border-white cursor-pointer placeholder:text-white hover:placeholder:text-gray-200" placeholder="Search movie here ..."/>
            <CiSearch className="text-white absolute text-3xl cursor-pointer" />
        </div>
    );
};

export default CustomSearch;