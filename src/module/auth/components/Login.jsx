import React from 'react';
import bgAuth from "../../../asset/image/login1.svg"
import CustomSearch from "../../widget/components/CustomSearch";
import {HiOutlineMail} from "react-icons/hi";
import {RiLockPasswordLine} from "react-icons/ri";
import {Link} from "react-router-dom";
const Login = () => {
    return (
        <div className="bg-gradient-to-br from-black to-rose-950 h-screen lg:py-40 py-20">
            <div className="md:columns-2 rounded-lg lg:mx-56 shadow-sm shadow-gray-50 h-full">
                <img src={bgAuth} className="rounded-lg md:block hidden h-full p-10" alt="logo"/>
                <div className="text-white font-bold w-4/5 ms-10 py-10">
                    <div className="text-4xl font-bold pb-5">
                        <Link to="">Login</Link>
                        /
                        <Link to="">Sign-In</Link>
                    </div>
                    <CustomSearch placeholder="Email" icon={<HiOutlineMail />} type={"email"}/>
                    <CustomSearch placeholder="Password" icon={<RiLockPasswordLine />} type={"password"}/>
                    <button className="btn w-full text-lg">Login</button>
                    <div className="my-5">
                        <p className="font-light mb-5">Don't have account?<Link to="/sign-up">Register</Link></p>
                        <Link className="flex items-center btn-outline btn hover:bg-white hover:text-black text-white mt-5 border-1" to="/">
                            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo"/>
                            <span>Continue with Google</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;