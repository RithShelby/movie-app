import React from "react";

const CustomSearch = ({ value, onChange, type, placeholder, icon, name ,className}) => {
  return (
    <div className={className}>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className="bg-transparent ps-10 py-2 focus:outline-none focus:ring-0 cursor-pointer placeholder:text-white w-full"
        placeholder={placeholder}
        autoComplete="off"
      />
      <i className="text-white absolute text-3xl cursor-pointer">{icon}</i>
    </div>
  );
};

export default CustomSearch;
