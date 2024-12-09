import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useShowTime } from "../core/hook";
import CustomLoading from "../../../widget/components/CustomLoading";

const TimeShow = () => {
    const { id } = useParams();
    const { getTimeDetail } = useShowTime();
    const timeDetail = useSelector((state) => state.showTimeList.timeDetail);
    const [loading, setLoading] = useState(true);
    // Log the data to ensure it's available
    console.log(timeDetail);

    useEffect(() => {
        const fetchTime = async () => {
            await getTimeDetail(id); // Fetch movie by ID
            setTimeout(() => {
                setLoading(false)
            },500)
        };

        if (id) {
            fetchTime();
        }
    }, [id]);
    // Check if movieDetail and imgUrl are available before rendering
    if (!timeDetail) {
        return <CustomLoading message={"Loading"} />;
    }
    return (
        <div className="text-white">
            {timeDetail.theaterId.map((theater) => (
                <div key={theater.id}>
                    <p><strong>Hall:</strong> {theater.hall}</p>
                    <p><strong>Location:</strong> {theater.location}</p>
                    <p><strong>Name:</strong> {theater.name?.label}</p>
                    <p><strong>Seats:</strong> {theater.seats.join(", ")}</p>
                </div>

            ))}
        </div>
    )
        ;
};

export default TimeShow;
