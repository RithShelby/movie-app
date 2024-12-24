import AuthPage from "../auth/index.jsx";
import HomePage from "../app/Home/Home.jsx";
import ShowTime from "../app/showTime";
import MovieDetail from "../app/showTime/components/MovieDetail";
import OrderList from "../app/showTime/components/OrderList";
import UserPage from "../auth/components/UserPage";
import CinemaPage from "../app/cinema";
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
    path : "/cinema",
    element: <CinemaPage/>
  },
  {
    path: "/:id",
    element: <MovieDetail />,
  },
  {
    path : "/user",
    element: <UserPage/>
  },
  {
    path : "/order-list",
    element: <OrderList/>
  }
];

export { AuthRoute, AppRoute };
