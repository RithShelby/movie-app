import React from "react";
import { Outlet } from "react-router-dom";
import HeaderApp from "./components/Header";

const LayoutApp = () => {
  return (
      <div className="bg-gradient-to-br from-zinc-900 to-slate-900 h-screen">
          <HeaderApp/>
          <Outlet/>
      </div>
  );
};

export default LayoutApp;
