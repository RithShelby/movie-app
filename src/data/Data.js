import {IoHomeOutline, IoLocationOutline, IoTicketOutline} from "react-icons/io5";
import React from "react";
import { RiMovie2Line } from "react-icons/ri";
import { MdOutlineVerifiedUser } from "react-icons/md";
import {SlSettings} from "react-icons/sl";
import {FaHouseChimney} from "react-icons/fa6";

const navData = [
  {
    icon:  <IoHomeOutline />,
    title: "Home",
    path: "/",
  },
  {
    icon: <IoLocationOutline />,
    title: "Cinema",
    path: "/cinema",
  },
];

const endData = [
  {
    icon: <IoTicketOutline />,
    title: "Ticket",
    path: "/order-list",
  },
  {
    icon: <MdOutlineVerifiedUser />,
    title: "JoinUs",
    path: "/auth/login",
  },
  {
    icon: <SlSettings />,
    title: "Setting",
    path: "/user",
  },
];
const mobileNavData = [
  {
    icon:  <IoHomeOutline />,
    title: "Home",
    path: "/",
  },
  {
    icon: <IoLocationOutline />,
    title: "Cinema",
    path: "/cinema",
  },
  {
    icon: <IoTicketOutline />,
    title: "Ticket",
    path: "/order-list",
  },
]
const BannerData = [
  {
    id: 1,
    image: require("../asset/image/oppenhemer.jpg"),
    title: "Oppenheimer",
    desc: "A dramatization of the life story of J. Robert Oppenheimer, the physicist who had a large hand in the development of the atomic bombs that brought an end to World War II.",
  },
  {
    id: 2,
    image: require("../asset/image/spider1.jpg"),
    title: "Spider-man Mile Morales",
    desc:
      "Join Miles Morales as he leaps through the multiverse, meeting a diverse team of Spider-People on a" +
      " mission to protect the fabric of existence itself. It's a high-flying adventure full of heart, action, and a new hero discovering his powers!",
    trailer: "https://youtu.be/cqGjhVJWtEg?si=bP7i080YcdIz0bWA",
    detail: "/",
  },
  {
    id: 3,
    image: require("../asset/image/luca.jpeg"),
    title: "Luca",
    desc: "Set against the stunning backdrop of the Italian Riviera, Luca tells the heartwarming story of an unforgettable summer where two friends, one human and one sea monster, navigate the wonders and challenges of friendship, freedom, and self-discovery",
  },

];
export { endData, navData, BannerData,mobileNavData };
