import React from "react";
import CustomSearch from "../../widget/components/CustomSearch";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import {Link} from "react-router-dom";
import { useAuth } from "../core/hook";
import { useFormik } from "formik";
const Login = () => {
  const { onLogin } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
        await onLogin(values);
    },
  });
  return (
      <form onSubmit={formik.handleSubmit}>
        <CustomSearch
            name={"email"}
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email"
            icon={<HiOutlineMail/>}
            type={"email"}
        />
        <CustomSearch
            name={"password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            icon={<RiLockPasswordLine/>}
            type={"password"}
        />
        <button className="btn w-full text-lg" type="submit">
          Login
        </button>
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
