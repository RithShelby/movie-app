import React from 'react';

const CustomSearch = ({searchTerm,handleSearch,type,placeholder,icon}) => {
    return (
        <div className="flex items-center relative border-b active:border-b transition-all hover:border-b my-5">
            <input value={searchTerm} onChange={handleSearch} type={type} className="bg-transparent rounded-2xl ps-10 py-2 focus:outline-none focus:ring-0 focus:rounded-none cursor-pointer placeholder:text-white hover:placeholder:text-gray-200 " placeholder={placeholder}/>
            <i className="text-white absolute text-3xl cursor-pointer">{icon}</i>
        </div>
    );
};

export default CustomSearch;