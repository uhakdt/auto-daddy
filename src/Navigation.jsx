import React from "react";
import { useLocation } from "react-router";
import Routing from "./Routing";
import "./Navigation.css";

function Navigation() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <>
      <Routing />
    </>
  );
}

export default Navigation;
