
import {IoGitNetworkOutline, IoLocationOutline, IoTicketOutline} from "react-icons/io5";
import React from "react";
import {RiMovie2Line} from "react-icons/ri";

const navData = [
    {
        icon : <RiMovie2Line />,
        title : "Home",
        path : "/"
    },
    {
        icon : <IoLocationOutline />,
        title : "Cinema",
        path : "/"
    },
    // {
    //     icon :<IoGitNetworkOutline />,
    //     title : "Community",
    //     path : "/"
    // },
]
const endData = [
    {
        icon : <IoTicketOutline />,
        title : "Ticket",
        path : "/sign-up"
    },
    // {
    //     icon : <MdOutlineVerifiedUser />,
    //     title : "JoinUs",
    //     path : "/sign-up"
    // },
]
const BannerData = [
    {
        id : 1,
        image: require("../asset/image/banner2.jpeg")
    },
    {
        id : 2,
        image: require("../asset/image/banner2.jpeg")
    },
    {
        id : 3,
        image: require("../asset/image/banner3.png")
    },
]
export {endData,navData,BannerData}