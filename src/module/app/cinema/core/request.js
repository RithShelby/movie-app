import {db} from "../../../../config/firebase-config";
import {collection} from "firebase/firestore";

const reGetTheater = collection(db,"theaters");
export {reGetTheater}