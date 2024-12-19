import React, { useEffect, useState } from "react";
import LocalStorage from "../../../helper/LocalStorage";
import { useAuth } from "../core/hook";
import CustomSearch from "../../widget/components/CustomSearch";
import { useFormik } from "formik";

const UserPage = () => {
    const [user, setUser] = useState(null); // User data from localStorage
    const { OnLogout, updateUser } = useAuth(); // Access updateUser and OnLogout hooks

    // Initialize formik with empty initial values
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            age: null,
            name: "",
            nation: "",
        },
        onSubmit: async (values) => {
            if (user && user.id) {
                try {
                    // Update Firestore and localStorage
                    await updateUser(user.id, values);

                    // Update local state for UI reactivity
                    setUser({ ...user, ...values });
                } catch (err) {
                    console.error("Error updating user profile:", err);
                }
            } else {
                console.error("User ID is missing for Firestore update.");
            }
        },
        enableReinitialize: true, // Reinitialize values when `user` state changes
    });

    // Load user data from localStorage on component mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser); // Set user state with data from localStorage
        } else {
            console.warn("No user data found in localStorage.");
        }
    }, []);

    // Update formik values when `user` state changes
    useEffect(() => {
        if (user) {
            formik.setValues({
                email: user.email || "",
                password: user.password || "",
                age: user.age || null,
                name: user.name || "",
                nation: user.nation || "",
            });
        }
    }, [user]);

    return (
        <div className="text-white lg:mx-24 md:px-10 lg:w-auto lg:h-auto md:w-full overflow-y-auto w-full h-full">
            <LocalStorage setData={setUser} />
            {user && (
                <div className="lg:py-36 md:py-36 px-5 py-3 h-screen ">
                    <p className="lg:block md:hidden lg:text-3xl hidden">Welcome, {user.name} 👋</p>
                    <p className="text-xl lg:hidden md:block block">Personal Information</p>
                    <hr className="mb-10 mt-2"/>
                    <form onSubmit={formik.handleSubmit} className="text-gray-300 lg:columns-2">
                        <span>
                             <label className="m-auto">Email</label>
                            <CustomSearch
                                className="border rounded-md border-gray-500 lg:w-full lg:mb-5 md:mb-5 sm:py-2 mb-3"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                placeholder="Email"
                                type="email"
                            />
                        </span>
                        <span>
                            <label>Password</label>
                            <CustomSearch
                                className="border rounded-md border-gray-500 lg:w-full lg:mb-5 md:mb-5 sm:py-2 mb-3"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                placeholder="Password"
                                type="password"
                            />
                        </span>
                        <span>
                             <label>Age</label>
                            <CustomSearch
                                className="border rounded-md border-gray-500 lg:w-full lg:mb-5 md:mb-5 sm:py-2 mb-3"
                                name="age"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                placeholder="Age"
                                type="number"
                            />
                        </span>
                        <span>
                            <label>Name</label>
                            <CustomSearch
                                name="name"
                                className="border rounded-md border-gray-500 lg:w-full lg:mb-5 md:mb-5 sm:py-2 mb-3"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder="Name"
                                type="text"
                            />
                        </span>
                        <span>
                             <label>Nation</label>
                            <CustomSearch
                                name="nation"
                                className="border rounded-md border-gray-500 lg:w-full lg:mb-5 md:mb-5 sm:py-2 mb-3"
                                value={formik.values.nation}
                                onChange={formik.handleChange}
                                placeholder="Nation"
                                type="text"
                            />
                        </span>
                        <span>
                             <label>PhoneNumber</label>
                            <CustomSearch
                                name="nation"
                                className="border rounded-md border-gray-500 lg:w-full lg:mb-5 md:mb-5 sm:py-2 mb-3"
                                value={formik.values.nation}
                                onChange={formik.handleChange}
                                placeholder="Nation"
                                type="text"
                            />
                        </span>
                    </form>
                    <span className="flex lg:justify-start md:justify-start justify-end">
                         <button className="btn me-5" type="submit">
                        Save Change
                        </button>
                        <button onClick={OnLogout} className="btn btn-error">
                            Logout
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
};

export default UserPage;
