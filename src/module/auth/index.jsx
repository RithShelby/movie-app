import React from "react";

import { Link, useLocation } from "react-router-dom";
import bgAuth from "../../asset/image/login1.svg";
import Login from "./components/Login";
import Register from "./components/Register";
const AuthPage = () => {
  const location = useLocation();
  // Determine which component to render
  const isLogin = location.pathname === "/auth/login";
  return (
    <div className="bg-gradient-to-br from-black to-rose-950 lg:py-24 py-20 ">
      <div className="breadcrumbs text-xl text-white flex items-ceneter justify-center ">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to={isLogin ? "/auth/sign-up" : "/auth/login"}>
              {isLogin ? "Sign-Up" : "Login"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="lg:columns-2 md:columns-2 rounded-lg shadow shadow-slate-50 w-full h-screen">
        <img
          src={bgAuth}
          className="rounded-lg md:block hidden m-auto p-20"
          alt="logo"
        />
        <div className="text-white font-bold flex flex-col px-10 lg:pt-20 lg:px-32">
          <div className="text-4xl font-bold py-5">
            <Link
              to="/auth/login"
              className={`cursor-pointer ${isLogin ? "border-b-4" : ""}`}
            >
              Login
            </Link>
            /
            <Link
              to="/auth/sign-up"
              className={`cursor-pointer ${!isLogin ? "border-b-4" : ""}`}
            >
              Sign-Up
            </Link>
          </div>
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
