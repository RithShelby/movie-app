import React from "react";
import CustomSearch from "../../widget/components/CustomSearch";
import { HiOutlineMail } from "react-icons/hi";
import {Link, useNavigate} from "react-router-dom";
import { useFormik } from "formik";
import { useAuth } from "../core/hook";
import * as Yup from "yup";
import { LuUserRound } from "react-icons/lu";

const Register = () => {
    const { createUser, SignInWithGoogle } = useAuth();
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        name: Yup.string()
            .min(3, "Name must be at least 3 characters")
            .required("Name is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            name: "",
        },
        validationSchema, // Apply validation schema
        onSubmit: async (values) => {
            await createUser(values);
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
            <button className="btn w-full text-lg btn-accent" type="submit">
                Sign-Up
            </button>
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
            <div className="my-5">
                <span className="font-light mb-5 flex">
                  <p className="pe-3">Don't have an account?</p>
                  <Link to="/auth/login">
                    <p className="font-bold">Login</p>
                  </Link>
                </span>
            </div>
        </form>
    );
};

export default Register;
