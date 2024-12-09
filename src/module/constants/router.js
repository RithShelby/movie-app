import AuthPage from "../auth/index.jsx";
import HomePage from "../app/Home/Home.jsx";
import ShowTime from "../app/showTime";
import MovieDetail from "../app/showTime/components/MovieDetail";
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
    path: "/",
    element: <ShowTime />,
  },
  {
    path: "/:id",
    element: <MovieDetail />,
  },
  // {
  //   path : "/showtime/:timeId",
  //   element: <TimeShow />,
  // },
];

export { AuthRoute, AppRoute };
