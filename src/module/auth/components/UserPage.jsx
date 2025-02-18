import React, { useEffect, useState } from "react";
import LocalStorage from "../../../helper/LocalStorage";
import { useAuth } from "../core/hook";
import CustomSearch from "../../widget/components/CustomSearch";
import { useFormik } from "formik";
import CustomInput from "../../widget/components/CustomSearch";

const UserPage = () => {
    const [user, setUser] = useState(null); // User data from localStorage
    const { OnLogout, updateUser } = useAuth(); // Access updateUser and OnLogout hooks
    // Update formik values when user data changes
    useEffect(() => {
        if (user) {
            formik.setValues({
                email: user.email || "",
                password: user.password || "",
                age: user.age || "",
                name: user.name || "",
                nation: user.nation || "",
                phone: user.phone || "",
            });
        }
    }, [user]);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            age: "",
            name: "",
            nation: "",
            phone: "",
        },
        onSubmit: async (values) => {
            if (user && user.id) {
                try {
                    await updateUser(user.id, values); // Update Firestore
                    setUser({ ...user, ...values }); // Update local state
                } catch (error) {
                    console.error("Error updating user profile:", error);
                }
            } else {
                console.error("User ID is missing.");
            }
        },
        enableReinitialize: true, // Sync form values with user data
    });
    return (
        <div className="text-white lg:mx-24 md:px-10 lg:w-auto lg:h-auto md:w-full overflow-y-auto w-full h-full">
            <LocalStorage setData={setUser} />
            {user && (
                <form onSubmit={formik.handleSubmit}  className="lg:py-36 md:py-36 px-5 py-3 h-screen ">
                    <p className="lg:block md:hidden lg:text-3xl hidden">Welcome, {user.name} 👋</p>
                    <p className="text-xl lg:hidden md:block block">Personal Information</p>
                    <hr className="mb-10 mt-2"/>
                    <div className="text-gray-300 lg:columns-2">
                        <span>
                             <label className="m-auto">Email</label>
                            <CustomInput
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
                            <CustomInput
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
                            <CustomInput
                                className="border rounded-md border-gray-500 lg:w-full lg:mb-5 md:mb-5 sm:py-2 mb-3"
                                name="age"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                placeholder="Age"
                                type="text"
                            />
                        </span>
                        <span>
                            <label>Name</label>
                            <CustomInput
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
                            <CustomInput
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
                            <CustomInput
                                name="phone"
                                className="border rounded-md border-gray-500 lg:w-full lg:mb-5 md:mb-5 sm:py-2 mb-3"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                placeholder="Phone Number"
                                type="text"
                            />
                        </span>
                    </div>
                    <span className="flex lg:justify-start md:justify-start justify-end">
                         <button className="btn me-5" type="submit">
                        Save Change
                        </button>
                        <button onClick={OnLogout} className="btn btn-error">
                            Logout
                        </button>
                    </span>
                </form>
            )}
        </div>
    );
};

export default UserPage;
