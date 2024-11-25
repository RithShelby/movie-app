import React, {useEffect} from "react";
import Banner from "../banner/Banner";
import ShowTime from "../showTime";
import {useHome} from "./core/hook";

const HomePage = () => {
  return (
    <React.Fragment>
      <div className="bg-gradient-to-br from-zinc-900 to-slate-900 overflow-x-hidden">
        <Banner />
        <ShowTime />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
