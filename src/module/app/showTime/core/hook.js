import { useDispatch } from "react-redux";
import {getDocs, getDoc, doc, setDoc,updateDoc,deleteDoc} from "@firebase/firestore";
import {setMovieDetail, setSeats, setShowTime} from "./ShowTimeSlice";
import {reGetShowTime, reMovieDetail, reqBooking, reqSeats,} from "./request";
import {db} from "../../../../config/firebase-config";
import {useNavigate} from "react-router-dom";
const useShowTime = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

            if (!Array.isArray(movieData.timeId)) {
                console.warn(`Time IDs for movie ID ${movieId} are not in an array.`);
                movieData.timeId = [];
            }

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
                                const theaterData = theaterSnapshot.data();
                                // Resolve the seatsId reference in the theater document
                                if (theaterData.seatsId) {
                                    const seatsSnapshot = await getDoc(theaterData.seatsId);

                                    if (seatsSnapshot.exists()) {
                                        theaterData.seatsId = {
                                            id: theaterData.seatsId.id,
                                            ...seatsSnapshot.data(),
                                        };
                                    }
                                }
                                // Attach the resolved theater data and the seats data
                                timeData.theaterId = {
                                    id: timeData.theaterId.id,
                                    ...theaterData,
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
    const createBooking = async (values) => {
        try {
            const bookingRequest = await getDocs(reqBooking);
            const size = bookingRequest.size;
            const customId = "order" + (size + 1);
            const bookingRef = doc(reqBooking, customId);
            await setDoc(bookingRef, values);

            // Retrieve existing orders from localStorage
            const existingOrders = JSON.parse(localStorage.getItem("ordered")) || [];

            // Append the new order to the existing orders
            const updatedOrders = [...existingOrders, values];

            // Save the updated orders list back to localStorage
            localStorage.setItem("ordered", JSON.stringify(updatedOrders));

            navigate("/order-list");
        } catch (err) {
            console.error("Error creating booking:", err);
        }
    };
    const deleteBooking = async (id) => {
        try {
            // Delete from Firebase
            const bookingRef = doc(db, "booking", id);
            await deleteDoc(bookingRef);

            // Retrieve the current list from localStorage
            const existingOrders = JSON.parse(localStorage.getItem("ordered")) || [];

            // Filter out the booking with the specified id
            const updatedOrders = existingOrders.filter(order => order.id !== id);

            // Update localStorage with the filtered orders
            localStorage.setItem("ordered", JSON.stringify(updatedOrders));

            console.log(`Booking with id ${id} deleted successfully.`);
        } catch (e) {
            console.error("Error deleting booking:", e);
        }
    };


    const getSeats = async () => {
        try {
            const data = await getDocs(reqSeats);
            const mapData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            dispatch(setSeats(mapData))
        }catch (e){
            console.log(e)
        }
    }
    const updateSeatsValue = async (id, selectedSeats) => {
        try {
            // Reference to the seatsList document
            const seatsDocRef = doc(db, "seatsList", id);
            // Fetch the current seatsList document
            const seatsDocSnap = await getDoc(seatsDocRef);

            if (seatsDocSnap.exists()) {
                // Get the current seats array
                const seats = seatsDocSnap.data().seats;

                // Update the seat status
                const updatedSeats = seats.map((seat) => {
                    try {
                        if (selectedSeats.includes(seat.label) && seat.value === true) {
                            console.log(`Updating seat ${seat.label} from true to false.`);
                            return { ...seat, value: false }; // Change status to false
                        }
                        return seat; // Leave other seats unchanged
                    } catch (error) {
                        console.error(`Error updating seat ${seat.label}:`, error);
                        return seat; // Leave the seat unchanged in case of an error
                    }
                });

                // Update the Firestore document with the modified seats array
                await updateDoc(seatsDocRef, { seats: updatedSeats });
                await getSeats();
            } else {
                console.error("Seats document does not exist.");
            }
        } catch (error) {
            console.error("Error updating seats:", error);
        }
    };


    return { getShowTime,getMovieDetail,createBooking,getSeats,updateSeatsValue ,deleteBooking};
};

export { useShowTime };
