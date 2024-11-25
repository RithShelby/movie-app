import {getDocs} from "@firebase/firestore";
import {reGetMovieList} from "./request";
import {useDispatch} from "react-redux";
import {setMovies} from "./HomeSlice";

const useHome = () =>{
    const dispatch = useDispatch();
    // const getMovie = async () => {
    //     try {
    //         const data = await getDocs(reGetMovieList);
    //         // map data to be array
    //         const mapData = data.docs.map((doc) => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }));
    //         dispatch(setMovies(mapData));
    //         // console.log(mapData);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };
    // return {getMovie}
}
export {useHome}