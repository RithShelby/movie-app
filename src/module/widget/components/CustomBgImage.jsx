import React from 'react';

const CustomBgImage = ({imgProp}) => {
    return (
        <div
            className="absolute top-0 left-0 w-full h-full opacity-60"
            style={{
                backgroundImage: `url(${imgProp})`, // Set the background image
                backgroundSize: "cover", // Ensure the image covers the entire div
                backgroundPosition: "center", // Center the background image
                filter: "blur(10px)", // Apply the blur effect
                zIndex: -1, // Keep the blurred background behind the content
                position: "absolute", // Position it absolutely
                top: 0, // Align to the top of the container
                left: 0, // Align to the left of the container
                right: 0, // Align to the right of the container
                bottom: 0, // Align to the bottom of the container
            }}
        ></div>
    );
};

export default CustomBgImage;