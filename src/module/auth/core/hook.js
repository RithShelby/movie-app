import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase-config";
import { reqLogin, reqRegister, reSignInWithGoogle } from "./request";

const useAuth = () => {
    const navigate = useNavigate();
  const OnRegister = (values) => {
    return reqRegister(values)
      .then(() => {
        navigate("/");
        localStorage.setItem("LoginObject", JSON.stringify(values));
        alert("Success");
          console.log(values);
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error")
      });
  };
    const SignInWithGoogle = () => {
        return reSignInWithGoogle()
            .then((result) => {
                // Retrieve the user data from the result
                const user = result.user;

                // Store the user data in localStorage
                localStorage.setItem("LoginObject", JSON.stringify(user));

                // Navigate to the home page
                navigate("/");

                // Notify the user
                alert("Success");
            })
            .catch((err) => {
                // Handle errors
                alert(`Error: ${err.message}`);
            });
    };

  const Onlogin = (values) => {
    reqLogin(values)
      .then(() => {
        // Success();
        navigate("/");
        console.log(values);
        localStorage.setItem("LoginObject", JSON.stringify(values));

        alert("Success");
      })
      .catch((error) => {
        console.log(error.message);
        alert('Error')
      });
  };
  const OnLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth/login");
      alert("Success");
      localStorage.removeItem("LoginObject");
    } catch (error) {
      console.log(error.message);
      alert("Error")
    }
  };

  return { OnRegister, OnLogout, Onlogin, SignInWithGoogle };
};

export { useAuth };
