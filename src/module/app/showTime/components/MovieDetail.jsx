import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useShowTime } from "../core/hook";
import CustomLoading from "../../../widget/components/CustomLoading";
import CustomBgImage from "../../../widget/components/CustomBgImage";

const MovieDetail = () => {
    const { id } = useParams();
    const { getMovieDetail } = useShowTime();
    const movieDetail = useSelector((state) => state.showTimeList.movieDetail);
    const [loading, setLoading] = useState(true);

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

    console.log(movieDetail);

    // Check if movieDetail and imgUrl are available before rendering
    if (!movieDetail || !movieDetail.imgUrl) {
        return <CustomLoading message={"Loading"} />;
    }

    return (
        <div className="flex flex-col bg-slate-950 text-white ">
            <div key={id} className="backdrop-blur-xl lg:px-48 lg:py-36 lg:h-screen p-3">
                <CustomBgImage imgProp={movieDetail.imgUrl}/>
                {loading ? (
                    <CustomLoading message={"Loading"}/>
                ) : (
                    <div
                        className="shadow-2xl rounded-xl text-white lg:flex lg:flex-row lg:justify-between md:flex md:flex-row md:justify-between flex flex-col-reverse m-auto items-center"
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
                            <hr/>
                            <p className="text-lg text-slate-300 mt-3 leading-7 ">{movieDetail.description}</p>
                        </div>
                        <div className="lg:relative">
                            <img
                                className="lg:w-96  md:w-screen w-full rounded-xl"
                                src={movieDetail.imgUrl}
                                alt={movieDetail.title?.value || "Movie Poster"}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col items-start lg:px-48 lg:py-10">
                <p className="font-bold text-4xl">ShowTime</p>
                {/*<span className="bg-gray-600 w-full font-bold uppercase text-xl my-6 ">*/}
                {/*    {[...new Set(movieDetail.timeId.map((item) => item.theaterId.location))].join(", ")}*/}
                {/*</span>*/}
                <div className="">
                    {movieDetail.timeId.map((item, index) => (
                        <button key={index} className="border rounded-3xl py-2 px-10 m-2">
                            {item.time}
                        </button>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default MovieDetail;
