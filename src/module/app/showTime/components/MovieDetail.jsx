import React, { useEffect, useState } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { useSelector } from "react-redux";
import { useShowTime } from "../core/hook";
import CustomLoading from "../../../widget/components/CustomLoading";
import CustomBgImage from "../../../widget/components/CustomBgImage";
import {IoArrowBackOutline} from "react-icons/io5";
import {PiArmchairFill} from "react-icons/pi";
import {useFormik} from "formik";
import {SuccessAlert} from "../../../widget/sweetalert/hook";

const MovieDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getMovieDetail,createBooking,updateSeatsValue} = useShowTime();
    const movieDetail = useSelector((state) => state.showTimeList.movieDetail);
    const [loading, setLoading] = useState(true);
    const [selectedShowTime, setSelectedShowTime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
const formik = useFormik({
    initialValues : {
        movieImg : "",
        movieName : "",
        hall : "",
        date : "",
        time : "",
        totalPrice: "",
        selectedSeats : [],
    },
    onSubmit:async (values) => {
        setLoading(true); // Start loading indicator
        try {
            await createBooking(values);
            await updateSeatsValue(selectedShowTime.theaterId.seatsId.id, formik.values.selectedSeats);
            // Wait for 2 seconds to simulate loading
            setTimeout(() => {
                setLoading(false); // Stop loading indicator
                SuccessAlert(); // Show success alert
                setSelectedSeats([]); // Clear selected seats after booking
                navigate("/order-list");
                // closeModal();
            }, 200);
        } catch (err) {
            setLoading(false); // Ensure loading stops in case of error
            console.error(err);
        }
    }
})
    const closeModal = () => {
        setSelectedShowTime(null);
        setSelectedSeats([]); // Reset selected seats
    };
    useEffect(() => {
        const fetchMovie = async () => {
            await getMovieDetail(id); // Fetch movie by ID
            setTimeout(() => {
                setLoading(false);
            }, 100);
        };
        if (id){
             fetchMovie();
        }
    }, [id]);

    // Check if movieDetail and imgUrl are available before rendering
    if (!movieDetail || !movieDetail.imgUrl) {
        return <CustomLoading message={"Loading"} />;
    }
    const handleSeatClick = (seat) => {
        const seatPrice = selectedShowTime?.theaterId?.price || 5;

        setSelectedSeats((prevSelectedSeats) => {
            let updatedSeats;

            if (prevSelectedSeats.includes(seat)) {
                // If the seat is already selected, remove it from the list
                updatedSeats = prevSelectedSeats.filter((s) => s !== seat);
            } else {
                // If the seat is not selected, add it to the list
                updatedSeats = [...prevSelectedSeats, seat];
            }

            const updatedTotalPrice = updatedSeats.length * seatPrice;

            // Update Formik values
            formik.setFieldValue('selectedSeats', updatedSeats);
            formik.setFieldValue('totalPrice', updatedTotalPrice);

            return updatedSeats;
        });
    };

// When booking is created, update seat status in Firestore
    const handleShowTimeClick = (item) => {
        // Update selected showtime
        setSelectedShowTime(item);

        // Set Formik values for movie details and showtime
        formik.setFieldValue("movieName", movieDetail.title?.value || "N/A");
        formik.setFieldValue("hall", item.theaterId.hall || "N/A");
        formik.setFieldValue(
            "date",
            `${movieDetail.showDate.day}-${movieDetail.showDate.date}-${movieDetail.showDate.month}`
        );
        formik.setFieldValue("time", item.time || "N/A");
        formik.setFieldValue("totalPrice", )
        formik.setFieldValue("movieImg",movieDetail.imgUrl)

    };


    return (
        <div className="flex flex-col bg-slate-950 text-white lg:p-0 pb-20">
            <div className="backdrop-blur-xl lg:px-48 lg:py-36">
                <CustomBgImage imgProp={movieDetail.imgUrl} />
                {loading ? (
                    <CustomLoading message={"Loading"} />
                ) : (
                    <div
                        className="shadow-2xl rounded-xl text-white lg:flex lg:flex-row lg:justify-between md:flex md:flex-col-reverse flex flex-col-reverse m-auto items-center"
                        style={{
                            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                            backgroundColor: "rgba(0, 0, 0, 0.6)", // Add a semi-transparent background for contrast
                        }}>
                        <div className="flex flex-col lg:w-2/3 md:w-full p-10">
                            <p className="font-bold lg:text-6xl lg:tracking-wide text-5xl">{movieDetail.title?.value || "Untitled Movie"}</p>
                            <span className="lg:flex lg:justify-between items-center">
                                <ul className="flex list-disc my-3">
                                    <li className="list-none">{movieDetail.duration || "Unknown"} minutes</li>
                                    <li className="mx-5">{movieDetail.type || "Unknown"}</li>
                                    <li>{movieDetail.releaseDate || "Unknown"}</li>
                                </ul>
                            <p className="font-bold lg:text-3xl text-sky-400 text-3xl">
                                {movieDetail.timeId
                                    ?.flatMap((item) => item.theaterId?.name.value)
                                    .join(", ") || "Unknown"}
                            </p>
                            </span>
                            <hr className="my-5"/>
                            <p className="text-lg text-slate-300 leading-7 ">{movieDetail.description}</p>
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
                                type="button"
                                onClick={() => handleShowTimeClick(item)}
                                className="border-2 p-2 me-3 rounded-3xl cursor-pointer hover:border-sky-400 transition-all ease-in-out hover:scale-110 ">
                                {item.time} p.m
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
                                            {/*Handle Select Seats*/}
                                            <span className="text-lg pt-5 grid grid-cols-4 gap-5 lg:mt-5 border-b border-black lg:pb-10 md:pb-10 pb-5">
                                            {item.theaterId.seatsId.seats.map((seat, index) => (
                                                <p
                                                    key={index}
                                                    className={`p-2 rounded-lg w-14 m-auto cursor-pointer ${
                                                        seat.value === false
                                                            ? "bg-red-400" // Seat is taken
                                                            : selectedSeats.includes(seat.label)
                                                                ? "bg-green-400" // Seat is selected
                                                                : "bg-gray-300" // Seat is available
                                                    }`}
                                                    onClick={() => {
                                                        if (seat.value !== false) handleSeatClick(seat.label); // Allow only if seat is available
                                                    }}
                                                >
                                                    {seat.label}
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
                                        <div className="lg:w-1/2 lg:px-20 m-0">
                                            <p className="font-bold lg:text-3xl md:text-3xl text-2xl text-start">Order
                                                Information</p>
                                            <img src={formik.values.movieImg}
                                                 className="lg:hidden md:hidden block w-20 m-auto rounded-md mt-10" alt="img"/>
                                            <div className="flex justify-between leading-9 lg:py-10">
                                                <div className="text-start">
                                                    <p>Movie : </p>
                                                    <p>Hall : </p>
                                                    <p>Date : </p>
                                                    <p>Time : </p>
                                                    <p>Your Seats : </p>
                                                </div>
                                                <div className="text-start">
                                                    <p>{formik.values.movieName}</p>
                                                    <p>{formik.values.hall}</p>
                                                    <p>{formik.values.date}</p>
                                                    <p>{formik.values.time} p.m</p>
                                                    <p>{formik.values.selectedSeats.join(",") || "No selected"}</p>
                                                </div>
                                            </div>
                                            <hr className="border border-black/35 my-5 lg:flex md:flex hidden"/>
                                            <div className="bg-sky-500/20 p-2 my-3">
                                                <p className="font-bold lg:text-3xl md:text-3xl text-xl text-start">Total
                                                    : {formik.values.totalPrice} $</p>
                                            </div>
                                            <span className="lg:flex md:flex lg:mt-5 md:mt-5 flex m-0 justify-start">
                                                 <button className="btn px-7" onClick={closeModal}>Back</button>
                                                 <button type="submit"
                                                         className="btn ms-5 bg-slate-700/100 text-white px-7 outline-black">Pay Now</button>
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
