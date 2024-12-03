import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useShowTime } from "./core/hook";
import CustomSwiper from "../../widget/components/CustomSwiper";
import CustomLoading from "../../widget/components/CustomLoading";
import {Link} from "react-router-dom";

const ShowTime = () => {
    const { ShowTimeList } = useSelector((state) => state.showTimeList);
    const { getShowTime } = useShowTime();
    const [selectedOption, setSelectedOption] = useState(ShowTimeList.length > 0 ? ShowTimeList[0]?.date : null);
    const [filteredShowTimes, setFilteredShowTimes] = useState([]); // Filtered showtimes
    const [loading,setLoading] = useState(false);

    // Fetch showtimes on component mount
    useEffect(() => {
         getShowTime();
    }, []);

    // Set default to Monday's data in both filtered showtimes and dropdown
    useEffect(() => {
        if (ShowTimeList.length > 0) {
            const firstMonday = ShowTimeList.find((item) => item.date.day === "Monday");
            if (firstMonday) {
                const mondayOption = {
                    value: firstMonday.date,
                    label: `${firstMonday.date.day}, ${firstMonday.date.date} ${firstMonday.date.month}`,
                };
                setSelectedOption(mondayOption); // Set Monday as the default in the dropdown
                setFilteredShowTimes([firstMonday]); // Filter by Monday by default
            } else {
                setFilteredShowTimes(ShowTimeList); // Fallback: show all data
            }
        }
    }, [ShowTimeList]);
    const filterShowTimes = (selectedDates) => {
        if (!selectedDates) {
            setFilteredShowTimes(ShowTimeList);
        } else {
            const datesArray = Array.isArray(selectedDates) ? selectedDates.map((opt) => opt.value) : [selectedDates.value];
            // console.log("Dates Array:", datesArray);
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
        },500)

    };

    return (
        <div className="text-white lg:mx-24 py-10 md:px-10 px-3">
            <h1 className="text-4xl font-bold mb-5">Now Showing</h1>
            <CustomSwiper
                data={ShowTimeList.map((item, index) => {
                    const isActive = selectedOption === item.date; // Check if the current item is active
                    return (
                        <div
                            key={index}
                            className={`cursor-pointer flex flex-col text-center border rounded-lg w-56 py-3 lg:mx-5 md:mx-1   ${
                                isActive ? "border-blue-900 shadow-inner shadow-blue-500" : ""
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
                            <div key={index} className="lg:columns-4 md:columns-2 columns-2 gap-4 px-5 mt-5 cursor-pointer">
                                {item.movieId.map((movie, idx) => (
                                    <div className="lg:p-5 md:px-2 md:py-5 pb-10">
                                        <div className="flex flex-col justify-start text-start">
                                            <Link to={`${movie.id}`}>
                                                <img
                                                    src={movie.imgUrl}
                                                    alt={movie.title.value}
                                                    className="rounded-lg w-full"
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
