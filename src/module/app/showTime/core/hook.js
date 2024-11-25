
import {useDispatch} from "react-redux";
import {reGetShowTime} from "./request";
import {setShowTime} from "./ShowTimeSlice";
import {getDocs,getDoc} from "@firebase/firestore";

const useShowTime = () =>{
    const dispatch = useDispatch();
    const getShowTime = async () => {
        try {
            const data = await getDocs(reGetShowTime);
            const mapData = await Promise.all(
                data.docs.map(async (doc) => {
                    const showTimeData = doc.data();
                    // Ensure movieId is an array before using map
                    const movieDataPromises = Array.isArray(showTimeData.movieId)
                        ? showTimeData.movieId.map(async (movieRef) => {
                            const movieSnapshot = await getDoc(movieRef);
                            return movieSnapshot.exists() ? movieSnapshot.data() : null;
                        })
                        : []; // If movieId is not an array, create an empty array (or handle other cases)

                    // Fetch the theater document
                    const theaterSnapshot = await getDoc(showTimeData.theaterId);
                    const theaterData = theaterSnapshot.exists()
                        ? theaterSnapshot.data().name.value
                        : "Null Theater";

                    // Wait for all movie data to be fetched
                    const movies = await Promise.all(movieDataPromises);

                    return {
                        ...showTimeData,
                        id: doc.id,
                        movieId: movies.filter((movie) => movie !== null), // Filter out null values
                        theaterId: theaterData,
                    };
                })
            );

            // Dispatch the serializable data to Redux
            dispatch(setShowTime(mapData));
        } catch (err) {
            console.error(err);
        }
    };

    return {getShowTime}
};
export {useShowTime}