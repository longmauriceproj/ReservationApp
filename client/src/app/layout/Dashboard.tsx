import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Dashboard;
