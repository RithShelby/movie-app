import { useNavigate } from "react-router-dom";
import {signOut} from "firebase/auth";
import {auth, db} from "../../../config/firebase-config";
import {reqGetUser, reqRegister, reSignInWithGoogle} from "./request";
import {doc, getDocs, setDoc, where, query, updateDoc,} from "@firebase/firestore";
import {useDispatch} from "react-redux";
import {setAuthList} from "./authSlice";
import {ErrorAlert, SuccessAlert} from "../../widget/sweetalert/hook";

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
      })
      .catch((error) => {
        console.log(error.message);
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
            })
            .catch((err) => {
                console.log(err)
            });
    };
    const updateUser = async (userId, values) => {
        try {
            // Firestore update
            const userRef = doc(db, "userList", userId);
            await updateDoc(userRef, values);

            // Update localStorage
            const currentUser = JSON.parse(localStorage.getItem("user")) || {};
            const updatedUser = { ...currentUser, ...values };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            SuccessAlert({ title: "Setting Updated!", text: "Thank you 🙏🏼" });
            console.log("User profile updated successfully.");
        } catch (error) {
            console.error("Error updating user:", error);
            ErrorAlert();
        }
    };
    const onLogin = async (values) => {
        try {
            // Query Firestore for a user with matching email
            const q = query(reqGetUser,
                where("email", "==", values.email),
                where("password" , "==" , values.password)
            );
            const querySnapShot = await getDocs(q);
            if (!querySnapShot.empty) {
                let authenticatedUser = null;
                // Loop through results to find matching password
                querySnapShot.forEach((doc) => {
                    const userData = doc.data();
                    authenticatedUser = { id: doc.id, ...userData };
                });
                if (authenticatedUser) {
                    // Save authenticated user data including ID to localStorage
                    localStorage.setItem("user", JSON.stringify(authenticatedUser));
                    console.log("Login successful");
                    // Redirect user after successful login
                    navigate("/");
                } else {
                    console.log("Invalid password");
                    ErrorAlert();
                }
            } else {
                ErrorAlert();
                console.log("User not found");
            }
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
    }
  };

  return { OnRegister, OnLogout, onLogin, SignInWithGoogle ,getUser,createUser,updateUser};
};

export { useAuth };
