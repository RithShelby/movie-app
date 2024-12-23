import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useShowTime } from "./core/hook";
import CustomSwiper from "../../widget/components/CustomSwiper";
import CustomLoading from "../../widget/components/CustomLoading";
import {Link} from "react-router-dom";
import CustomSearch from "../../widget/components/CustomSearch";
import {CiSearch} from "react-icons/ci";

const ShowTime = () => {
    const { ShowTimeList } = useSelector((state) => state.showTimeList);
    const { getShowTime } = useShowTime();
    const [selectedOption, setSelectedOption] = useState(null);
    const [filteredShowTimes, setFilteredShowTimes] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
         getShowTime();
    }, []);

    // Set default to Monday's data in both filtered showtimes
    useEffect(() => {
        if (ShowTimeList.length > 0) {
            const firstMonday = ShowTimeList.find((item) => item.date.day === "Monday");
            if (firstMonday) {
                setSelectedOption(firstMonday.date); // Set Monday as the default in the dropdown
                setFilteredShowTimes([firstMonday]); // Filter by Monday by default
            } else {
                setSelectedOption(ShowTimeList[0].date)
                setFilteredShowTimes([ShowTimeList[0]]); // Fallback: show all data
            }
        }
    }, [ShowTimeList]);

    const filterShowTimes = (selectedDates) => {
        if (!selectedDates) {
            setFilteredShowTimes(ShowTimeList);
        } else {
            const datesArray = Array.isArray(selectedDates) ? selectedDates.map((opt) => opt.value) : [selectedDates.value];
            const filtered = ShowTimeList.filter((item) =>
                datesArray.some(
                    (date) =>
                        date.day === item.date.day &&
                        date.date === item.date.date &&
                        date.month === item.date.month
                )
            );
            setFilteredShowTimes(filtered);
        }
    };

    // Handle clicks on desktop date buttons
    const handleDateClick = (date) => {
        setLoading(true);
        setTimeout(() => {
            filterShowTimes({ value: date });
            setSelectedOption(date); // Set the clicked date as active
            setLoading(false)
        },100)

    };

    return (
        <div className="text-white lg:mx-24 md:pb-20 py-10 md:px-10 px-3">
            <span className="flex justify-between ">
                <p className="lg:text-4xl md:text-3xl text-2xl font-bold mb-5">Now Showing</p>
            </span>
            <CustomSwiper
                data={ShowTimeList.map((item) => {
                    const isActive = selectedOption === item.date; // Check if the current item is active
                    return (
                        <div
                            key={item.date}
                            className={`cursor-pointer flex flex-col text-center border border-gray-400 rounded-lg lg:w-2/3 md:w-full lg:p-4 md:p-4 p-2 lg:text-lg md:text-lg text-sm text-gray-300 m-auto ${
                                isActive ? "shadow-inner shadow-blue-500 rounded-lg border-0" : ""
                            }`}
                            onClick={() => handleDateClick(item.date)}
                        >
                            <p>{item.date.day}</p>
                            <p>{item.date.date}</p>
                            <p>{item.date.month}</p>
                        </div>
                    );
                })}
            />
            <div className="mt-4 text-center">
                {loading ? (
                    <CustomLoading message={"Loading ..."}/>
                ) : (
                    filteredShowTimes.map((item, index) => (
                            <div key={index} className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 cursor-pointer">
                                {item.movieId.map((movie, idx) => (
                                    <div key={movie.id} className="lg:p-5 md:px-2 md:py-5 pb-10">
                                        <div className="flex flex-col justify-start text-start">
                                            <Link to={`${movie.id}`}>
                                                <img
                                                    src={movie.imgUrl}
                                                    alt={movie.title.value}
                                                    className="rounded-lg lg:h-96 md:h-80 h-64"
                                                />
                                            </Link>

                                            <div className="my-2 flex px-2">
                                                <span className="">
                                                    <p className="font-bold text-sm">{movie.title?.value}</p>
                                                    <p className="text-gray-400">{movie.releaseDate}</p>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                    ))
                )
                }

            </div>
        </div>
    );
};

export default ShowTime;
