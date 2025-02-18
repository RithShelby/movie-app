import React from "react";
import CustomSearch from "../../widget/components/CustomSearch";
import { HiOutlineMail } from "react-icons/hi";
import {Link} from "react-router-dom";
import { useAuth } from "../core/hook";
import { useFormik } from "formik";
import {PiPasswordBold} from "react-icons/pi";
import * as Yup from "yup"; // Import Yup
const Login = () => {
  const { onLogin ,SignInWithGoogle} = useAuth();
    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string()
            .min(10, "Password must be at least 10 characters")
            .required("Password is required"),
    });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
      validationSchema,
    onSubmit: async (values) => {
        await onLogin(values);
    },
  });
  return (
      <form onSubmit={formik.handleSubmit}>
        <CustomSearch
            className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
            name={"email"}
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            icon={<HiOutlineMail/>}
            type={"email"}
        />
          {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}
        <CustomSearch
            className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
            name={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            icon={<PiPasswordBold/>}
            type={"password"}
        />{formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
      )}

        <button className="btn w-full text-lg" type="submit">
          Login
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
            <p className="pe-3"> Don't have account ? </p>
            <Link to="/auth/sign-up">
              <p className="font-bold">Register</p>
            </Link>
          </span>
        </div>
      </form>
  );
};

export default Login;
