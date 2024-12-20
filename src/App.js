import React from "react";
import "../src/asset/css/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutApp from "./module/layout/layoutApp";
import { AppRoute, AuthRoute } from "./module/constants/router";
import ProtectRoute from "./helper/ProtectRoute";
import ScrollToTop from "./helper/ScrollTop";
const App = () => {
  return (
    <BrowserRouter>
        <ScrollToTop/>
      <Routes>
        <Route
          path="/"
          element={
              <ProtectRoute>

                  <LayoutApp />
              </ProtectRoute>
          }
        >
          {AppRoute.map((ar, index) => (
            <Route key={index} path={ar.path} element={ar.element} />
          ))}
        </Route>
        {AuthRoute.map((r, index) => (
          <Route key={index} path={r.path} element={r.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
