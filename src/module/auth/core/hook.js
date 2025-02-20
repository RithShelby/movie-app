import { useNavigate } from "react-router-dom";
import {getAuth, signOut, updateEmail,updatePassword} from "firebase/auth";
import {auth, db} from "../../../config/firebase-config";
import {reqGetUser, reSignInWithGoogle} from "./request";
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
  //   const OnRegister = (values) => {
  //   return reqRegister(values)
  //     .then(() => {
  //       navigate("/");
  //       localStorage.setItem("user", JSON.stringify(values));
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // };
    const createUser = async (values) => {
        try {
            const userRequest = await getDocs(reqGetUser);
            const size = userRequest.size;
            //customId
            const customId = "user" + (size+1);
            const userRef = doc(reqGetUser,customId);
            localStorage.setItem("user", JSON.stringify(values));
            await setDoc(userRef,values);
            navigate("/");
        }catch (e) {
            console.log(e)
        }
    }
    // const SignInWithGoogle = () => {
    //     return reSignInWithGoogle()
    //         .then((result) => {
    //             // Retrieve the user data from the result
    //             const user = result.user;
    //             // Store the user data in localStorage
    //             localStorage.setItem("user", JSON.stringify(user));
    //             // Navigate to the home page
    //             navigate("/");
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         });
    // };
    const SignInWithGoogle = () => {
        // Function to check if the user is in an embedded web view
        const isInEmbeddedBrowser = () => {
            const userAgent = navigator.userAgent || navigator.vendor || window.google;
            return (
                userAgent.includes("FBAN") || // Facebook App
                userAgent.includes("FBAV") || // Facebook App
                userAgent.includes("Twitter") || // Twitter App
                userAgent.includes("LinkedIn") // LinkedIn App
            );
        };

        if (isInEmbeddedBrowser()) {
            // Prompt the user to open in a secure browser
            alert("Please open this link in your default browser for a better experience.");
            window.open("https://cinetime.vercel.app/", "_system"); // Adjust the URL to your app's URL
            return; // Exit the function
        }

        // Proceed with Google sign-in
        reSignInWithGoogle()
            .then((result) => {
                // Retrieve the user data from the result
                const user = result.user;
                // Store the user data in localStorage
                localStorage.setItem("user", JSON.stringify(user));
                // Navigate to the home page
                navigate("/");
            })
            .catch((err) => {
                console.error("Error during sign-in:", err);
            });
    };

    // const updateUser  = async (userId, values) => {
    //     // console.log("Updating user with ID:", userId, "and values:", values);
    //     try {
    //         // Firestore update
    //         const userRef = doc(db, "userList", userId); // Ensure "userList" is the correct collection
    //         await updateDoc(userRef, values);
    //
    //         // Update localStorage
    //         const currentUser  = JSON.parse(localStorage.getItem("user")) || {};
    //         const updatedUser  = { ...currentUser , ...values };
    //         localStorage.setItem("user", JSON.stringify(updatedUser ));
    //         SuccessAlert({ title: "Setting Updated!", text: "Thank you 🙏🏼" });
    //         console.log("User  profile updated successfully.");
    //     } catch (error) {
    //         console.error("Error updating user:", error);
    //         ErrorAlert();
    //     }
    // };
    const updateUser  = async (userId, values) => {
        const auth = getAuth();
        const user = auth.currentUser ; // Get the currently signed-in user

        try {
            // Update Firestore
            const userRef = doc(db, "userList", userId);
            await updateDoc(userRef, values);

            // Update email if provided and user is signed in
            if (values.email && user) {
                await updateEmail(user, values.email); // Update email in Firebase Auth
            }

            // Update password if provided and user is signed in
            if (values.password && user) {
                await updatePassword(user, values.password); // Update password in Firebase Auth
            }

            // Update localStorage
            const currentUser  = JSON.parse(localStorage.getItem("user")) || {};
            const updatedUser  = { ...currentUser , ...values };
            localStorage.setItem("user", JSON.stringify(updatedUser ));

            SuccessAlert({ title: "Setting Updated!", text: "Thank you 🙏🏼" });
            console.log("User  profile updated successfully.");
        } catch (error) {
            console.error("Error updating user:", error);
            ErrorAlert();
        }
    };
    const onLogin = async (values) => {
        try {
            const q = query(reqGetUser ,
                where("email", "==", values.email),
                where("name", "==" , values.name)
            );
            const querySnapShot = await getDocs(q);
            if (!querySnapShot.empty) {
                let authenticatedUser  = null;
                querySnapShot.forEach((doc) => {
                    const userData = doc.data();
                    authenticatedUser  = { id: doc.id, ...userData }; // Ensure id is included
                });
                if (authenticatedUser ) {
                    localStorage.setItem("user", JSON.stringify(authenticatedUser));
                    console.log("Login successful");
                    navigate("/");
                } else {
                    console.log("Invalid password");

                }
            } else {
                ErrorAlert({title : "Email and Name Not founded !!" , text: "Try again please!!"});
            }
        } catch (e) {
            console.error("Error during login:", e);
            ErrorAlert({title : "Name Not founded !!" , text: "Try again please!!"});
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

  return {OnLogout, onLogin, SignInWithGoogle ,getUser,createUser,updateUser};
};

export { useAuth };
