import {useDispatch} from "react-redux";
import {setTheater} from "./TheaterSlice";
import {getDoc, getDocs} from "@firebase/firestore";
import {reGetTheater} from "./request";
const useTheater = () =>{
    const dispatch = useDispatch();
    const getTheater = async () => {
        try {
            const data = await getDocs(reGetTheater); // Fetch all theater documents

            const mapData = await Promise.all(
                data.docs.map(async (doc) => {
                    const theaterData = doc.data();

                    // Process seatsId reference
                    let seatData = null;
                    try {
                        const seatsSnapShot = await getDoc(theaterData.seatsId);
                        if (seatsSnapShot.exists()) {
                            seatData = { id: seatsSnapShot.id, ...seatsSnapShot.data() }; // Extract seat data
                        }
                    } catch (e) {
                        console.error("Error fetching seat data:", e);
                    }
                    const {seatsId , ...theaterFullData} = theaterData;
                    // Return the processed theater data with seat information
                    return {
                        id: doc.id,
                        ...theaterFullData,
                        seat: seatData, // Include the fetched seat data
                    };
                })
            );

            // Dispatch the processed data to Redux
            dispatch(setTheater(mapData));
        } catch (err) {
            console.error("Error fetching theaters:", err);
        }
    };

    return {getTheater}
}
export {useTheater}