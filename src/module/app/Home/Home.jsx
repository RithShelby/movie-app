import React from "react";
import Banner from "../banner/Banner";
import ShowTime from "../showTime";

const HomePage = () => {
  return (
      <div className="bg-gradient-to-br from-zinc-900 to-slate-900">
          <Banner/>
          <ShowTime/>
      </div>
  );
};

export default HomePage;
