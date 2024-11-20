import React from "react";
import Banner from "../banner/Banner";
import ShowTime from "../showTime";

const HomePage = () => {
  return (
    <React.Fragment>
      <div className="columns-1">
        <Banner />
        <ShowTime />
      </div>
    </React.Fragment>
  );
};

export default HomePage;
