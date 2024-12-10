import React from 'react';
import { IoArrowBackOutline } from "react-icons/io5";

const CustomModal = ({ isOpen, onOpen, onClose, buttonLabel, children }) => {
    return (
        <div>
            <button
                onClick={onOpen}
                className="border rounded-3xl py-2 px-10 m-2"
            >
                {buttonLabel}
            </button>
            {isOpen && (
                <div
                    className="modal-open fixed inset-0 bg-black/60 z-50 flex items-center justify-center lg:px-32 lg:py-10 p-10"
                >
                    <span
                        onClick={onClose}
                        className="border border-black rounded-3xl p-2 fixed lg:top-10 top-5 mt-3 lg:left-36 md:top-10 md:left-12 left-10"
                    >
                        <IoArrowBackOutline className="m-auto" />
                    </span>
                    <div className="bg-white/90 rounded-xl p-10">
                        {children}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomModal;
