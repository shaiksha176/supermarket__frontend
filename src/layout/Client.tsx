import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Client = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Client;
