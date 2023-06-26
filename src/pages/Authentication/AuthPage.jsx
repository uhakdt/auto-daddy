import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../../firebase";
import { AppContext } from "../../appContext";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ResetForm from "./ResetForm";

import "./AuthPage.css";

function AuthPage() {
  const { previousPage, vehicleFreeData } = useContext(AppContext);
  const [user, loading] = useAuthState(auth);
  const [activeForm, setActiveForm] = useState("login");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("login")) setActiveForm("login");
    else if (location.pathname.includes("register")) setActiveForm("register");
    else if (location.pathname.includes("reset")) setActiveForm("reset");
  }, [location]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) {
      if (previousPage === "/packages" && vehicleFreeData !== null) {
        navigate("/packages");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, loading, previousPage, vehicleFreeData, navigate]);

  return (
    <div className="auth">
      <div className="auth__sidebar"></div>
      <div className="auth__container">
        <a href="/">
          <img
            className="auth__logo"
            src={`${process.env.PUBLIC_URL}/autodaddy-logo.png`}
            alt="Logo"
          />
        </a>
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="reset" element={<ResetForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default AuthPage;
