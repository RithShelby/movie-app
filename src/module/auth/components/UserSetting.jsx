import React, { useEffect, useState } from "react";
import LocalStorage from "../../../helper/LocalStorage";
import { useAuth } from "../core/hook";
import { useFormik } from "formik";
import CustomInput from "../../widget/components/CustomSearch";

const UserSetting = () => {
    const [user, setUser ] = useState(null); // User data from localStorage
    const { OnLogout, updateUser  } = useAuth(); // Access updateUser  and OnLogout hooks

    // Initialize formik
    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
        },
        onSubmit: async (values) => {
            if (!user || !(user.id || user.uid)) {
                console.error("User  ID is missing. Cannot update user.");
                return;
            }
            await updateUser (user.id || user.uid, values);
        },
    });

    // Update formik values when user data changes
    useEffect(() => {
        const storedUser  = JSON.parse(localStorage.getItem("user"));
        console.log("Stored user from localStorage:", storedUser );
        if (storedUser ) {
            setUser (storedUser );
            formik.setValues({
                email: storedUser.email || "",
                name: storedUser.name || "",
            });
        }
    }, []); // Add formik to the dependency array

    return (
        <div className="text-white lg:mx-24 md:px-10 lg:w-auto lg:h-auto md:w-full overflow-y-auto w-full h-full">
            <LocalStorage setData={setUser } />
            {user && (
                <form onSubmit={formik.handleSubmit} className="lg:py-36 md:py-36 px-5 py-3 h-screen ">
                    <p className="lg:block md:hidden lg:text-3xl hidden">Welcome Back {user.displayName} {user.name} 👋</p>
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
                            <label>Name</label>
                            <CustomInput
                                className="border rounded-md border-gray-500 lg:w-full lg:mb-5 md:mb-5 sm:py-2 mb-3"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                placeholder="Name"
                                type="name"
                            />
                        </span>
                    </div>
                    <span className="flex lg:justify-start md:justify-start justify-end">
                        <button className="btn me-5" type="submit">
                            Save Change
                        </button>
                        <button type="button" onClick={OnLogout} className="btn btn-error">
                            Logout
                        </button>
                    </span>
                </form>
            )}
        </div>
    );
};

export default UserSetting;