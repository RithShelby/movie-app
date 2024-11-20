import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("LoginObject");
  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  return children;
};
export default ProtectedRoute;
