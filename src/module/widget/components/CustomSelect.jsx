import React, { useState } from 'react';
import Select from 'react-select';

const CustomSelect = ({ options, isMultiple, placeholder, onChange  ,value,isSearchable,isClearable}) => {
    const [isDisabled] = useState(false);
    const [isLoading] = useState(false);

    return (
        <Select
            value={value}
            className = "text-black"
            classNamePrefix="select"
            isDisabled={isDisabled}
            isLoading={isLoading}
            isClearable={isClearable}
            isSearchable={isSearchable}
            options={options}
            isMulti={isMultiple}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default CustomSelect;
