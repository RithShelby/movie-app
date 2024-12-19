import React from "react";
import CustomSearch from "../../widget/components/CustomSearch";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";
import { useFormik } from "formik";
import { useAuth } from "../core/hook";
import {FaPerson} from "react-icons/fa6";

const Register = () => {
  const {createUser ,SignInWithGoogle} = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      age : null,
      name : "",
      nation : "",
    },
    onSubmit: async (values) => {
      await createUser(values);
        console.log(values);
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
        <CustomSearch
            className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
            name={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            icon={<RiLockPasswordLine/>}
            type={"password"}
        />
        <CustomSearch
            className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
            name={"age"}
            value={formik.values.age}
            onChange={formik.handleChange}
            placeholder="Age"
            icon={<FaPerson/>}
            type={"number"}
        />
        <CustomSearch
            className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
            name={"name"}
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Name"
            icon={<HiOutlineMail/>}
            type={"text"}
        />
        <CustomSearch
            className="flex items-center border-b active:border-b transition-all hover:border-b my-5"
            name={"nation"}
            value={formik.values.nation}
            onChange={formik.handleChange}
            placeholder="Nation"
            icon={<HiOutlineMail/>}
            type={"text"}
        />
        <button className="btn w-full text-lg" type="submit">
          Sign-Up
        </button>
        <div className="my-5">
          <span className="font-light mb-5 flex">
            <p className="pe-3"> Don't have account ? </p>
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
