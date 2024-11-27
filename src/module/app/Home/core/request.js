import {db} from "../../../../config/firebase-config";
import {collection} from "firebase/firestore";

const reGetMovieList = collection(db, "movies");
export { reGetMovieList };