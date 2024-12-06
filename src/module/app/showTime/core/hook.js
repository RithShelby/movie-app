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

            if (!Array.isArray(movieData.timeId)) {
                console.warn(`Time IDs for movie ID ${movieId} are not in an array.`);
                movieData.timeId = [];
            }

            // Fetch theater data
            // const theaterDataPromise = movieData.theaterId.map(async (theaterRef) => {
            //     try {
            //         const theaterSnapshot = await getDoc(theaterRef);
            //         if (theaterSnapshot.exists()) {
            //             const theaterData = theaterSnapshot.data();
            //             return {
            //                 id: theaterRef.id,
            //                 ...theaterData,
            //             };
            //         }
            //     } catch (error) {
            //         console.error("Error fetching theater data:", error);
            //     }
            //     return null; // Return null if theater doesn't exist or fetch fails
            // });

            // Fetch time data
            const timeDataPromise = movieData.timeId.map(async (timeRef) => {
                try {
                    const timeSnapshot = await getDoc(timeRef);
                    if (timeSnapshot.exists()) {
                        const timeData = timeSnapshot.data();
                        // Resolve the theater reference in each time document
                        if (timeData.theaterId) {
                            const theaterSnapshot = await getDoc(timeData.theaterId);
                            if (theaterSnapshot.exists()) {
                                timeData.theaterId = {
                                    id: timeData.theaterId.id,
                                    ...theaterSnapshot.data(),
                                };
                            }
                        }
                        return {
                            id: timeRef.id,
                            ...timeData,
                        };
                    }
                } catch (error) {
                    console.error("Error fetching time data:", error);
                }
                return null; // Return null if time doesn't exist or fetch fails
            });
            const time = await Promise.all(timeDataPromise);
            const fullMovieData = {
                id: movieSnapshot.id,
                ...movieData,
                timeId: time, // Replace timeId with resolved time data
            };

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
