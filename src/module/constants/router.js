import AuthPage from "../auth/index.jsx";
import HomePage from "../app/Home/Home.jsx";
import ShowTime from "../app/showTime";
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
    element: <ShowTime />,
  },
];

export { AuthRoute, AppRoute };
