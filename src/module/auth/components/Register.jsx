import React from "react";
import CustomSearch from "../../widget/components/CustomSearch";
import { HiOutlineMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { RiLockPasswordLine } from "react-icons/ri";

const Register = () => {
  return (
    <div>
      <CustomSearch
        placeholder="Email"
        icon={<HiOutlineMail />}
        type={"email"}
      />
      <CustomSearch
        placeholder="Password"
        icon={<RiLockPasswordLine />}
        type={"password"}
      />
      <button className="btn w-full text-lg">Sign-Up</button>
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
        >
          <img
            src="https://img.icons8.com/color/48/000000/google-logo.png"
            alt="Google Logo"
          />
          <span>Continue with Google</span>
        </Link>
      </div>
    </div>
  );
};

export default Register;
