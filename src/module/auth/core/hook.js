import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase-config";
import { reqLogin, reqRegister, reSignInWithGoogle } from "./request";

const useAuth = () => {
  const navigate = useNavigate();
  const OnRegister = (values) => {
    reqRegister(values)
      .then(() => {
        navigate("/");
        console.log(values);
        localStorage.setItem("LoginObject", JSON.stringify(values));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const SignInWithGoogle = () => {
    return reSignInWithGoogle()
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
        const photoURL = result.user.photoURL;
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("photoURL", photoURL);
        // setUserByGoogle(result.user);
        localStorage.setItem("LoginObject", JSON.stringify());

        navigate("/");
      })
      .catch((error) => {
        console.error("Error during Google Sign-In: ", error);
      });
  };
  const Onlogin = (values) => {
    reqLogin(values)
      .then(() => {
        // Success();
        navigate("/");
        console.log(values);
        localStorage.setItem("LoginObject", JSON.stringify(values));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const OnLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth/login");
      // Success();
      localStorage.removeItem("LoginObject");
    } catch (error) {
      console.log(error.message);
    }
  };

  return { OnRegister, OnLogout, Onlogin, SignInWithGoogle };
};

export { useAuth };
