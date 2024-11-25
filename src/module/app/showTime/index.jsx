import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useShowTime } from "./core/hook";
import CustomSelect from "../../widget/components/CustomSelect";

const ShowTime = () => {
    const { ShowTimeList } = useSelector((state) => state.showTimeList);
    const { getShowTime } = useShowTime();
    const [selectedOption, setSelectedOption] = useState(null); // Store selected date(s)
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
        setSelectedOption(null); // Reset dropdown for consistency
    };

    // Handle selection in dropdown for mobile
    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        filterShowTimes(selected);
    };

    // Convert showtimes into dropdown options
    const dateOptions = ShowTimeList.map((item) => ({
        value: item.date,
        label: `${item.date.day}, ${item.date.date} ${item.date.month}`,
    }));

    return (
        <div className="text-white lg:mx-48 py-10 mx-2">
            <h1 className="text-4xl font-bold mb-5">Now Showing</h1>

            {/* Desktop: Render clickable date buttons */}
            <div className="hidden lg:flex md:flex md:justify-between mb-4">
                {ShowTimeList.map((item, index) => (
                    <div
                        key={index}
                        className="cursor-pointer flex flex-col items-center border rounded-lg p-4"
                        onClick={() => handleDateClick(item.date)}
                    >
                        <p>{item.date.day}</p>
                        <p>{item.date.date}</p>
                        <p>{item.date.month}</p>
                    </div>
                ))}
            </div>

            {/* Mobile: Render dropdown for filtering */}
            <div className="lg:hidden md:hidden flex justify-end">
                <CustomSelect
                    isSearchable={false}
                    options={dateOptions}
                    isMultiple={false} // Single selection for clarity
                    placeholder="Select a date to filter"
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className="text-black"
                />
            </div>

            {/* Render filtered showtimes */}
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
