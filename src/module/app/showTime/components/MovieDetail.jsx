import React, { useEffect, useState } from "react";
import {Link, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import { useShowTime } from "../core/hook";
import CustomLoading from "../../../widget/components/CustomLoading";
import CustomBgImage from "../../../widget/components/CustomBgImage";
import {IoArrowBackOutline} from "react-icons/io5";
import {PiArmchairFill} from "react-icons/pi";
import {useFormik} from "formik";
// import {Form, useFormik} from "formik";

const MovieDetail = () => {
    const { id } = useParams();
    const { getMovieDetail,createBooking } = useShowTime();
    const movieDetail = useSelector((state) => state.showTimeList.movieDetail);
    const [loading, setLoading] = useState(true);
    const [selectedShowTime, setSelectedShowTime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
const formik = useFormik({
    initialValues : {
        movieName : "",
        hall : "",
        date : "",
        time : "",
        price : "",
        totalPrice: "",
        selectedSeats : [],
    },
    onSubmit:async (values) => {
        try {
            await createBooking(values);
        }catch (err){
            console.log(err)
        }
    }
})
    useEffect(() => {
        const fetchMovie = async () => {
            await getMovieDetail(id); // Fetch movie by ID
            setTimeout(() => {
                setLoading(false);
            }, 500);
        };
        if (id) {
            fetchMovie();
        }
    }, [id]);

    // Check if movieDetail and imgUrl are available before rendering
    if (!movieDetail || !movieDetail.imgUrl) {
        return <CustomLoading message={"Loading"} />;
    }
    const handleSeatClick = (seat) => {
        // Get the price from the theater show time
        const seatPrice = selectedShowTime?.theaterId?.price || 5; // Default to 5 if price is not available

        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seat)) {
                // If the seat is already selected, remove it from the list
                const updatedSeats = prevSelectedSeats.filter((s) => s !== seat);
                setTotalPrice(updatedSeats.length * seatPrice); // Update total price
                return updatedSeats;
            } else {
                // If the seat is not selected, add it to the list
                const updatedSeats = [...prevSelectedSeats, seat];
                setTotalPrice(updatedSeats.length * seatPrice); // Update total price
                return updatedSeats;
            }
        });
    };
    const handleShowTimeClick = (showTime) => {
        setSelectedShowTime(showTime);
        setTotalPrice(0);
    };

    const closeModal = () => {
        setSelectedShowTime(null);
        setSelectedSeats([]); // Reset selected seats
        setTotalPrice(0); // Reset total price
    };
    return (
        <div className="flex flex-col bg-slate-950 text-white lg:p-0 ">
            <div className="backdrop-blur-xl lg:px-48 lg:py-36 lg:h-screen">
                <CustomBgImage imgProp={movieDetail.imgUrl} />
                {loading ? (
                    <CustomLoading message={"Loading"} />
                ) : (
                    <div
                        className="shadow-2xl rounded-xl text-white lg:flex lg:flex-row lg:justify-between md:flex md:flex-col-reverse flex flex-col-reverse m-auto items-center"
                        style={{
                            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            backgroundColor: "rgba(0, 0, 0, 0.6)", // Add a semi-transparent background for contrast
                        }}
                    >
                        <div className="flex flex-col lg:w-2/3 lg:px-10 md:w-full py-3 px-5">
                            <p className="font-bold lg:text-6xl lg:tracking-wide text-5xl">{movieDetail.title?.value || "Untitled Movie"}</p>
                            <div className="lg:flex lg:justify-between items-center justify-center my-3">
                                <ul className="list-disc flex lg:text-xl">
                                    <li className="list-none">{movieDetail.duration || "Unknown"} minutes</li>
                                    <li className="lg:mx-10 mx-7">{movieDetail.type || "Unknown"}</li>
                                    <li>{movieDetail.releaseDate || "Unknown"}</li>
                                </ul>
                                <p className="font-bold lg:text-5xl text-sky-400 text-3xl">
                                    {movieDetail.timeId
                                        ?.flatMap((item) => item.theaterId?.name.value)
                                        .join(", ") || "Unknown"}
                                </p>
                            </div>
                            <hr />
                            <p className="text-lg text-slate-300 mt-3 leading-7 ">{movieDetail.description}</p>
                        </div>
                        <div className="lg:relative lg:p-0 md:p-10 p-5">
                            <img
                                className="lg:w-96 md:w-full w-full rounded-xl"
                                src={movieDetail.imgUrl}
                                alt={movieDetail.title?.value || "Movie Poster"}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start lg:px-48 lg:py-10 md:p-10 p-5">
                <p className="font-bold text-4xl">ShowTime</p>
                <span className="w-full font-bold uppercase text-xl my-6 underline">
                    {[...new Set(movieDetail.timeId.map((item) => item.theaterId.location))].join(", ")}
                </span>
                {/*Modal Create Booking*/}
                <form onSubmit={formik.handleSubmit} className="flex">
                    {movieDetail.timeId.flatMap((item, index) => (
                        <div key={index}>
                            <button
                                onClick={() => handleShowTimeClick(item)}
                                className="border rounded-3xl py-2 px-7 me-5">
                                {item.time}
                            </button>
                            {selectedShowTime?.id === item.id && (
                                <div className="modal-open fixed inset-0 bg-black/60 z-50 lg:px-32 lg:py-10 md:p-10 p-2">
                                    <div className="w-full h-full text-black bg-white/90 rounded-xl text-center md:pt-20 pt-11 lg:flex justify-between p-10 overflow-y-auto">
                                        <div className="border-t-4 rounded-t-3xl border-sky-500/50 flex flex-col lg:w-1/2 ">
                                            <span onClick={closeModal}
                                                  className="border border-black/50 rounded-3xl p-2 fixed lg:top-10 lg:mt-3 lg:left-36 md:top-14 md:left-12 cursor-pointer top-5 left-3">
                                                <IoArrowBackOutline
                                                className="m-auto"/></span>
                                            <p className="text-xl mt-5">Screen : {item.theaterId.name?.value}</p>
                                            <span className="text-lg pt-5 grid grid-cols-4 gap-5 lg:mt-5 border-b border-black lg:pb-10 md:pb-10 pb-5">
                                                {item.theaterId.seats.map((seat, index) => (
                                                    <p
                                                        key={index}
                                                        className={`p-2 rounded-lg w-14 m-auto cursor-pointer ${
                                                            selectedSeats.includes(seat) ? "bg-green-400" : "bg-gray-300"
                                                        }`}
                                                        onClick={() => handleSeatClick(seat)} // Use single click to toggle seat selection
                                                    >
                                                        {seat}
                                                    </p>
                                                ))}
                                            </span>
                                            <span className="flex gap-5 items-center justify-center py-3">
                                                <span className="flex flex-col items-center">
                                                     <PiArmchairFill className="text-4xl"/>
                                                    <p>PerSeats</p>
                                                </span>
                                                <p>${item.theaterId.price}</p>
                                            </span>

                                        </div>
                                        <div className="lg:w-1/2 lg:px-20 lg:mt-7 m-0">
                                            <p className="font-bold lg:text-3xl md:text-3xl text-2xl text-start">Order Information</p>
                                            {/*<hr className="border border-black/35 lg:my-5 "/>*/}
                                            <div className="flex justify-between leading-9">
                                                <div className="text-start">
                                                    <p>Movie : </p>
                                                    <p>Hall : </p>
                                                    <p>Date : </p>
                                                    <p>Time : </p>
                                                    <p>Your Seats : </p>
                                                </div>
                                                <div className="text-start">
                                                    <p>{movieDetail.title?.value}</p>
                                                    <p>{item.theaterId.hall}</p>
                                                    <span className="flex">
                                                        <p>{movieDetail.showDate.day}-</p>
                                                        <p>{movieDetail.showDate.date}-</p>
                                                        <p>{movieDetail.showDate.month}</p>
                                                    </span>
                                                    <p>{item.time} p.m</p>
                                                    {/*<p>{item.theaterId.price} $ </p>*/}
                                                    <span>{selectedSeats.join(",") || "no selected"}</span>
                                                </div>
                                            </div>
                                            <hr className="border border-black/35 my-5 lg:flex md:flex hidden"/>
                                            <div className="bg-sky-500/20 p-2 my-3">
                                                <p className="font-bold lg:text-3xl md:text-3xl text-xl text-start">Total : {totalPrice} $</p>
                                            </div>
                                            <span className="lg:flex md:flex lg:mt-5 md:mt-5 flex m-0 justify-start">
                                                 <button className="btn px-7" onClick={closeModal}>Back</button>
                                                 <button type="submit" className="btn ms-5 bg-slate-700/100 text-white px-7 outline-black">Pay Now</button>
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    ))}
                </form>
            </div>
        </div>
    );
};

export default MovieDetail;
