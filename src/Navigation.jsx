import React from "react";
import { useLocation } from "react-router";
import { Box } from "@mui/material";
import MyRoutes from "./Routes";
import Header from "./Header";
import Footer from "./Footer";
import "./Navigation.css";

function Navigation() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth");

  return (
    <>
      {!isAuthPage && <Header />}
      {!isAuthPage && <Box sx={{ height: "64px" }} />}
      <MyRoutes />
      {!isAuthPage && <Footer />}
    </>
  );
}

export default Navigation;
