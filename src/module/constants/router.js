import AuthPage from "../auth/index.jsx";
import HomePage from "../app/Home/Home.jsx";
import Booking from "../app/booking/index.jsx";
import CinemaPage from "../app/cinema/index.jsx";
const AuthRoute = [
  {
    path: "/auth*",
    element: <AuthPage />,
  },
];
const AppRoute = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/cinema",
    element: <CinemaPage />,
  },
];

export { AuthRoute, AppRoute };
