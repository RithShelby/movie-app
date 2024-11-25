import {useDispatch} from "react-redux";
import {setTheater} from "./TheaterSlice";
import {getDocs} from "@firebase/firestore";
import {reGetTheater} from "./request";

const useTheater = () =>{
    const dispatch = useDispatch();
    const getTheater = async ()=>{
        try {
            const data = await getDocs(reGetTheater);
            const mapData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            dispatch(setTheater(mapData))
        }catch (err){
            // ErrorAlert();
        }
    }
    return {getTheater}
}
export {useTheater}