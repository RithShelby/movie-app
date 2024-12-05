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
                    const theaterDataPromise = Array.isArray(showTimeData.theaterId)
                        ? showTimeData.theaterId.map(async (theaterRef) => {
                            try {
                                const theaterSnapshot = await getDoc(theaterRef);
                                if (theaterSnapshot.exists()) {
                                    const theaterData = theaterSnapshot.data();
                                    return {
                                        id: theaterRef.id,
                                        ...theaterData,
                                    };
                                }
                            } catch (error) {
                                console.error("Error fetching theater data:", error);
                            }
                            return null; // Return null if theater doesn't exist or fetch fails
                        })
                        : [];
                    const movies = await Promise.all(movieDataPromises);
                    const theater = await Promise.all(theaterDataPromise)
                    return {
                        ...showTimeData,
                        id: doc.id,
                        movieId: movies.filter((movie) => movie !== null),
                        theaterId: theater.filter((theater) => theater !== null),
                    };
                })
            );

            dispatch(setShowTime(mapData));
            console.log(mapData);
        } catch (err) {
            console.error("Error fetching showtimes:", err);
        }
    };
    const getMovieDetail = async (movieId) => {
        try {
            const movieRef = reMovieDetail(movieId); // Get the movie reference
            const movieSnapshot = await getDoc(movieRef);

            if (!movieSnapshot.exists()) {
                console.error(`Movie with ID ${movieId} does not exist.`);
                return null;
            }

            const movieData = movieSnapshot.data();
            if (!Array.isArray(movieData.theaterId)) {
                console.warn(`Theater IDs for movie ID ${movieId} are not in an array.`);
                movieData.theaterId = [];
            }

            // Fetch theater data
            const theaterDataPromise = movieData.theaterId.map(async (theaterRef) => {
                try {
                    const theaterSnapshot = await getDoc(theaterRef);
                    if (theaterSnapshot.exists()) {
                        return {
                            id: theaterRef.id,
                            ...theaterSnapshot.data(),
                        };
                    }
                } catch (error) {
                    console.error("Error fetching theater data:", error);
                }
                return null; // Return null for any errors or missing data
            });

            const theaterData = await Promise.all(theaterDataPromise);

            const fullMovieData = {
                id: movieSnapshot.id,
                ...movieData,
                theaterId: theaterData.filter((theater) => theater !== null), // Remove null entries
            };

            // Dispatch to Redux store
            dispatch(setMovieDetail(fullMovieData));

            return fullMovieData;
        } catch (err) {
            console.error("Error fetching movie detail:", err);
            return null;
        }
    };

    return { getShowTime,getMovieDetail };
};

export { useShowTime };
