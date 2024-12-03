import {collection} from "firebase/firestore";
import { db } from "../../../../config/firebase-config";
import {doc} from "@firebase/firestore";

// Reference for showTimeList collection
const reGetShowTime = collection(db, "showTimeList");
const reMovieDetail = (movieId) => {
    return doc(db, "movies", movieId); // Returns a reference to the movie document
};

export { reGetShowTime ,reMovieDetail };
