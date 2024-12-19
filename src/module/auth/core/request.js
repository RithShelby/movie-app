import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {auth, db, googleProvider} from "../../../config/firebase-config";

import {collection} from "firebase/firestore";
const reqRegister = async (values) => {
  await createUserWithEmailAndPassword(auth, values.email, values.password);
};
// const reqLogin = async (values) => {
//   await signInWithEmailAndPassword(auth, values.email, values.password);
// };
const reqGetUser = collection(db,"userList");
const reSignInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};
export {reSignInWithGoogle, reqRegister,reqGetUser };
