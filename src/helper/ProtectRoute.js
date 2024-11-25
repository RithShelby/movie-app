import React from "react";
import { Navigate } from "react-router-dom";
const ProtectRoute = ({children}) => {
  const isAuthenticated = localStorage.getItem("LoginObject");
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  return children;
};
export default ProtectRoute;
