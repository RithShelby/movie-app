import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {useShowTime} from "../core/hook";
import CustomLoading from "../../../widget/components/CustomLoading";

const MovieDetail = () => {
    const { id } = useParams();
    const { getMovieDetail } = useShowTime();
    const movieDetail = useSelector((state) => state.showTimeList.movieDetail);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            await getMovieDetail(id); // Fetch movie by ID
            setTimeout(() => {
                setLoading(false)
            },500)
        };
        if (id) {
            fetchMovie();
        }
    }, [id]);
    console.log(movieDetail)
    return (
        <div key={id} className="text-white flex justify-center items-center lg:pt-40">
            {loading ?
                (<CustomLoading message={"Loading"}/>
                ) : <div className="m-auto text-center">
                    <img className="m-auto" src={movieDetail.imgUrl} alt={movieDetail.title?.value}/>
                    <h1>{movieDetail.title?.value || "Untitled Movie"}</h1>
                    <p>Release Date: {movieDetail.releaseDate || "Unknown"}</p>
                </div>
            }

        </div>
    );
};

export default MovieDetail;
