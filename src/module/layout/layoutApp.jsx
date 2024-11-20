import React from "react";
import { Outlet } from "react-router-dom";
import HeaderApp from "./components/Header";

const LayoutApp = () => {
  return (
    <div className="contents">
      <HeaderApp />
      <Outlet />
    </div>
  );
};

export default LayoutApp;
