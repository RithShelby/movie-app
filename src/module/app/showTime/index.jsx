import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useShowTime } from "./core/hook";
import CustomSwiper from "../../widget/components/CustomSwiper";

const ShowTime = () => {
    const { ShowTimeList } = useSelector((state) => state.showTimeList);
    const { getShowTime } = useShowTime();
    const [selectedOption, setSelectedOption] = useState(ShowTimeList[0]?.date || null); // Store selected date(s)
    const [filteredShowTimes, setFilteredShowTimes] = useState([]); // Filtered showtimes

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

    // Filter showtimes based on selected date(s)
    const filterShowTimes = (selectedDates) => {
        if (!selectedDates) {
            setFilteredShowTimes(ShowTimeList); // Reset to all if no selection
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
        filterShowTimes({ value: date });
        setSelectedOption(date); // Set the clicked date as active
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
                            className={`cursor-pointer flex flex-col items-center m-auto border rounded-lg w-56 py-3 lg:mx-5 md:mx-1  ${
                                isActive ? "border-blue-900 shadow-md shadow-blue-500" : ""
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
            <div className="mt-4">
                {filteredShowTimes.map((item, index) => (
                    <div key={index} className="lg:columns-4 md:columns-2 columns-2 gap-4">
                        {item.movieId.map((movie, idx) => (
                            <div key={idx} className="">
                                <img
                                    src={movie.imgUrl}
                                    alt="movie"
                                    className="rounded-md px-2 py-5"
                                />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShowTime;
