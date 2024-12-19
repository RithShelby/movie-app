import React from "react";
import { Outlet } from "react-router-dom";
import HeaderApp from "./components/Header";
import MobileHeader from "./components/Header/MobileHeader";

const LayoutApp = () => {
  return (
      <div className="bg-gradient-to-br from-zinc-900 to-slate-900 h-screen">
          <HeaderApp/>
          <MobileHeader/>
          <div className="lg:p-0 md:p-0 py-20 h-full lg:overflow-visible overflow-y-auto">
              <Outlet/>
          </div>
      </div>
  );
};

export default LayoutApp;
