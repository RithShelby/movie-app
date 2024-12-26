import React from "react";
import CustomSearch from "../../widget/components/CustomSearch";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../core/hook";
import * as Yup from "yup"; // Import Yup
import { FaPerson } from "react-icons/fa6";
import { LuUserRound } from "react-icons/lu";
import { CiFlag1 } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

const Register = () => {
    const { createUser, SignInWithGoogle, OnRegister } = useAuth();

    // Define validation schema with Yup
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string()
            .min(10, "Password must be at least 10 characters")
            .required("Password is required"),
        age: Yup.number()
            .typeError("Age must be a number")
            .positive("Age must be positive")
            .required("Age is required"),
        name: Yup.string()
            .min(5, "Name must be at least 5 characters")
            .required("Name is required"),
        nation: Yup.string().required("Nation is required"),
        phone: Yup.string()
            .matches(/^[0-9]+$/, "Phone must contain only numbers")
            .required("Phone number is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            age: "",
            name: "",
            nation: "",
            phone: "",
        },
        validationSchema, // Apply validation schema
        onSubmit: async (values) => {
            await createUser(values);
            await OnRegister(values);
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <CustomSearch
                className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Email"
                icon={<HiOutlineMail />}
                type="email"
            />
            {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}

            <CustomSearch
                className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                placeholder="Password"
                icon={<PiPasswordBold />}
                type="password"
            />
            {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

            <CustomSearch
                className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                placeholder="Age"
                icon={<FaPerson />}
                type="number"
            />
            {formik.touched.age && formik.errors.age && (
                <p className="text-red-500 text-sm">{formik.errors.age}</p>
            )}

            <CustomSearch
                className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Name"
                icon={<LuUserRound />}
                type="text"
            />
            {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}

            <CustomSearch
                className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
                name="nation"
                value={formik.values.nation}
                onChange={formik.handleChange}
                placeholder="Nation"
                icon={<CiFlag1 />}
                type="text"
            />
            {formik.touched.nation && formik.errors.nation && (
                <p className="text-red-500 text-sm">{formik.errors.nation}</p>
            )}

            <CustomSearch
                className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                placeholder="Phone"
                icon={<MdOutlineLocalPhone />}
                type="text"
            />
            {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
            )}

            <button className="btn w-full text-lg" type="submit">
                Sign-Up
            </button>

            <div className="my-5">
        <span className="font-light mb-5 flex">
          <p className="pe-3">Don't have an account?</p>
          <Link to="/auth/login">
            <p className="font-bold">Login</p>
          </Link>
        </span>
                <Link
                    className="flex items-center btn-outline btn hover:bg-white hover:text-black text-white mt-5 border-1"
                    to="/"
                    onClick={SignInWithGoogle}
                >
                    <img
                        src="https://img.icons8.com/color/48/000000/google-logo.png"
                        alt="Google Logo"
                    />
                    <span>Continue with Google</span>
                </Link>
            </div>
        </form>
    );
};

export default Register;
