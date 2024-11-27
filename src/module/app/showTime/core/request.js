import { collection } from "firebase/firestore";
import {db} from "../../../../config/firebase-config";

const reGetShowTime = collection(db, "showTimeList");
export { reGetShowTime };
