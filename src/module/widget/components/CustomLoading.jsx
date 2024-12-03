import React from 'react';

const CustomLoading = ({message}) => {
    return (
        <div className="flex justify-center items-center flex-col h-svh">
            <span className="loading loading-spinner loading-lg"></span>
            <p>{message}</p>
        </div>
    );
};

export default CustomLoading;