import {getDoc, getDocs} from "@firebase/firestore";
import {reGetMovieList} from "./request";
import {useDispatch} from "react-redux";
import {setMovies} from "./HomeSlice";

const useHome = () =>{
    const dispatch = useDispatch();
    const getMovie = async () => {
        try {
            const data = await getDocs(reGetMovieList);
            const mapData = await Promise.all(
                data.docs.map(async (doc) => {
                    const movieData = doc.data();
                    const theaterDataPromise = Array.isArray(movieData.theaterId)
                        ? movieData.theaterId.map(async (theaterRef) => {
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
                    const theater = await Promise.all(theaterDataPromise)
                    return {
                        ...movieData,
                        id:doc.id,
                        theaterId: theater.filter((theater) => theater !== null),
                    }
                })
            )
            dispatch(setMovies(mapData));
            console.log(mapData);
        } catch (err) {
            console.error(err);
        }
    };
    return {getMovie}
}
export {useHome}