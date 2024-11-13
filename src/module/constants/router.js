import Register from "../auth/components/Register";
import Login from "../auth/components/Login";
import ShowTime from "../app/showTime";
import Home from "../app/Home/Home";
import Banner from "../app/banner/Banner";

const AuthRoute = [
    {
        path : "/sign-up",
        element: <Register/>
    },
    {
        path : "/login",
        element: <Login/>
    }
]
const AppRoute = [
    {
        path : "/",
        element : <Banner/>
    }
]
export {AuthRoute,AppRoute}