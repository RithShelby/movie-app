import AuthPage from "../auth/index.jsx";
import HomePage from "../app/Home/Home.jsx";
import ShowTime from "../app/showTime";
import MovieDetail from "../app/showTime/components/MovieDetail";
import OrderList from "../app/orderlist/OrderList";
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
  {
    path : "/order-list",
    element: <OrderList/>
  }
];

export { AuthRoute, AppRoute };
