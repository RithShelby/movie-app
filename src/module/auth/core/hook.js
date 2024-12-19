import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import {auth, db} from "../../../config/firebase-config";
import {reqGetUser, reqRegister, reSignInWithGoogle} from "./request";
import {doc, getDocs, setDoc, where, query, updateDoc,} from "@firebase/firestore";
import {useDispatch} from "react-redux";
import {setAuthList} from "./authSlice";

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
    const updateUser = async (userId, values) => {
        try {
            // Firestore update
            const userRef = doc(db, "userList", userId);
            const updateData = {...values}
            await updateDoc(userRef, updateData);
            // Update localStorage
            const currentUser = JSON.parse(localStorage.getItem("user")) || {};
            const updatedUser = { ...currentUser, ...updateData };
            localStorage.setItem("user", JSON.stringify(updatedUser));
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };
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
                }
            } else {
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
      alert("Error")
    }
  };

  return { OnRegister, OnLogout, onLogin, SignInWithGoogle ,getUser,createUser,updateUser };
};

export { useAuth };
