import React from "react";
import "../src/asset/css/index.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LayoutApp from "./module/layout/layoutApp";
import {AppRoute, AuthRoute} from "./module/constants/router";
const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path = "/" element={
                  <LayoutApp/>
              }>
                  {AuthRoute.map((r,index) => (
                      <Route key = {index} path={r.path} element={r.element}/>
                  ))}
                  {AppRoute.map((ar,index) => (
                      <Route key = {index} path={ar.path} element={ar.element}/>
                  ))}
              </Route>
          </Routes>

      </BrowserRouter>
  )
}

export default App;
