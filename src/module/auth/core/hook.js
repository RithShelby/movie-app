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
      try{
          return reSignInWithGoogle().then(() => {
              localStorage.setItem("LoginObject", JSON.stringify);
              navigate("/");
          }).catch((err) => {
              alert(err)
          })

      }catch (err){
          alert(err)
      }
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
