import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase-config";
const reqRegister = async (values) => {
  await createUserWithEmailAndPassword(auth, values.email, values.password);
};
const reqLogin = async (values) => {
  await signInWithEmailAndPassword(auth, values.email, values.password);
};
const reSignInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};
export { reqLogin, reSignInWithGoogle, reqRegister };
