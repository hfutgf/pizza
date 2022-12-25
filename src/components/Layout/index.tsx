import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const index:React.FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default index;
