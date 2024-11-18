
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
        path : "/"
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
        image: require("../asset/image/spider1.jpg"),
        title : "Spider-man Mile Morales",
        desc : "Join Miles Morales as he leaps through the multiverse, meeting a diverse team of Spider-People on a" +
            " mission to protect the fabric of existence itself. It's a high-flying adventure full of heart, action, and a new hero discovering his powers!",
        trailer : "https://youtu.be/cqGjhVJWtEg?si=bP7i080YcdIz0bWA",
        detail : "/",
    },
    {
        id : 2,
        image: require("../asset/image/luca.jpeg"),
        title : "Luca",
        desc :  "Set against the stunning backdrop of the Italian Riviera, Luca tells the heartwarming story of an unforgettable summer where two friends, one human and one sea monster, navigate the wonders and challenges of friendship, freedom, and self-discovery"
    },
    {
        id : 3,
        image: require("../asset/image/cap1.jpeg"),
        title : "Captain America: Brave New World",
        desc : "Captain America's journey continues in a world that’s rapidly changing. With new threats emerging and old alliances tested, Steve Rogers faces his greatest challenge yet. Get ready for a bold new chapter in the legacy of the Star-Spangled Avenger!"
    },
]
export {endData,navData,BannerData}