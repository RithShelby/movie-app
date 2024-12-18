import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth, db} from "../../../config/firebase-config";
import {reqGetUser, reqLogin, reqRegister, reSignInWithGoogle} from "./request";
import {doc, getDocs, setDoc, where,query,} from "@firebase/firestore";
import {useDispatch} from "react-redux";
import {setAuthList} from "./authSlice";
import login from "../components/Login";
import {collection} from "firebase/firestore";

const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUser = async () => {
        try {
            const data = await getDocs(reqGetUser);
            const mapData = data.docs.map((doc) => ({
                ...doc.data(),
                id : doc.id
            }));
            dispatch(setAuthList(mapData))
        }catch (e){
            console.log(e)
        }
    }
  const OnRegister = (values) => {
    return reqRegister(values)
      .then(() => {
        navigate("/");
        localStorage.setItem("user", JSON.stringify(values));
        alert("Success");
          console.log(values);
      })
      .catch((error) => {
        console.log(error.message);
        alert("Error")
      });
  };
    const createUser = async (values) => {
        try {
            const userRequest = await getDocs(reqGetUser);
            const size = userRequest.size;
        //customId
            const customId = "user" + (size+1);
            const userRef = doc(reqGetUser,customId);
            await setDoc(userRef,values);
            navigate("/");
            console.log("Create Success")
        }catch (e) {
            console.log(e)
        }
    }
    const SignInWithGoogle = () => {
        return reSignInWithGoogle()
            .then((result) => {
                // Retrieve the user data from the result
                const user = result.user;

                // Store the user data in localStorage
                localStorage.setItem("user", JSON.stringify(user));

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
    const onLogin = async (values) => {
        try {
            // Query for documents where email and password match
            const q = query(
                reqGetUser,
                where("email", "==", values.email),
                where("password", "==", values.password) // Ensure password is hashed and compared securely in production
            );

            // Get matching documents
            const querySnapShot = await getDocs(q);

            // Check if any documents are found
            if (!querySnapShot.empty) {
                querySnapShot.forEach((doc) => {
                    // Get user data
                    const userData = doc.data();
                    console.log("User data:", userData);
                    // Example: Save user data to localStorage
                    localStorage.setItem("user", JSON.stringify(userData));
                });

                // Redirect user or handle successful login
                console.log("Login successful");
            } else {
                console.log("Invalid email or password");
            }
            navigate("/")
        } catch (e) {
            console.error("Error during login:", e);
        }
    };

    const OnLogout = async () => {
    try {
      await signOut(auth);
      navigate("/auth/login");
      localStorage.removeItem("user");
    } catch (error) {
      console.log(error.message);
      alert("Error")
    }
  };

  return { OnRegister, OnLogout, onLogin, SignInWithGoogle ,getUser,createUser };
};

export { useAuth };
