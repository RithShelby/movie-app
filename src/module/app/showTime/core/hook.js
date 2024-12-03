import { useDispatch } from "react-redux";
import { getDocs, getDoc} from "@firebase/firestore";
import {setMovieDetail, setShowTime} from "./ShowTimeSlice";
import {reGetShowTime, reMovieDetail} from "./request";
const useShowTime = () => {
    const dispatch = useDispatch();

    const getShowTime = async () => {
        try {
            const data = await getDocs(reGetShowTime);
            const mapData = await Promise.all(
                data.docs.map(async (doc) => {
                    const showTimeData = doc.data();

                    // Fetch movie details with ID included
                    const movieDataPromises = Array.isArray(showTimeData.movieId)
                        ? showTimeData.movieId.map(async (movieRef) => {
                            const movieSnapshot = await getDoc(movieRef);
                            if (movieSnapshot.exists()) {
                                const movieData = movieSnapshot.data();
                                return {
                                    id: movieRef.id, // Include movie ID
                                    ...movieData,
                                };
                            }
                            return null; // Handle non-existing movies
                        })
                        : [];

                    // Fetch theater details
                    const theaterSnapshot = await getDoc(showTimeData.theaterId);
                    const theaterData = theaterSnapshot.exists()
                        ? theaterSnapshot.data().name.value
                        : "Null Theater";

                    const movies = await Promise.all(movieDataPromises);

                    return {
                        ...showTimeData,
                        id: doc.id,
                        movieId: movies.filter((movie) => movie !== null),
                        theaterId: theaterData,
                    };
                })
            );

            dispatch(setShowTime(mapData));
            // console.log(mapData);
        } catch (err) {
            console.error("Error fetching showtimes:", err);
        }
    };
    const getMovieDetail = async (movieId) => {
        try {
            const movieRef = reMovieDetail(movieId); // Get the movie reference from request.js
            const movieSnapshot = await getDoc(movieRef);
            if (movieSnapshot.exists()) {
                const movieData = {
                    id: movieSnapshot.id,
                    ...movieSnapshot.data(),
                };
                // Dispatch movie details to Redux
                dispatch(setMovieDetail(movieData));
                return movieData; // Return movie data for immediate use
            } else {
                console.error(`Movie with ID ${movieId} does not exist.`);
                return null;
            }
        } catch (err) {
            console.error("Error fetching movie detail:", err);
            return null;
        }
    };
    return { getShowTime,getMovieDetail };
};

export { useShowTime };
