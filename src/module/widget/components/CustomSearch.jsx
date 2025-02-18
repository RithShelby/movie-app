import React from "react";

const CustomInput = ({ value, onChange, type, placeholder, icon, name ,className}) => {
  return (
      <div className={className}>
          <i className="text-white text-3xl cursor-pointer relative ">{icon}</i>
          <input
              name={name}
              value={value}
              onChange={onChange}
              type={type}
              className="bg-transparent ps-5 py-2 focus:outline-none focus:ring-0 cursor-pointer placeholder:text-white "
              placeholder={placeholder}
              autoComplete="off"
          />
      </div>
  );
};

export default CustomInput;
