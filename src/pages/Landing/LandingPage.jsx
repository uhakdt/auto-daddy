import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Helmet } from "react-helmet";

import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import {
  Snackbar,
  SwipeableDrawer,
  Button,
  List,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import "./LandingPage.css";

import Modal from "@mui/material/Modal";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";
import LandingFooter from "../NavMenus/LandingFooter";
import LandingBody from "./LandingBody";

function LandingPage() {
  const [user] = useAuthState(auth);

  // const user = auth.currentUser;

  const [open, setOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [formType, setFormType] = useState("login");

  const handleModalOpen = () => {
    setOpen(true);
  };

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navigate = useNavigate();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <>
      <Helmet>
        <title>AutoDaddy | Home</title>
        <meta
          name="description"
          content="AutoDaddy: Get your complete Car History Check and ask ChatGPT any questions you have about it."
        />
        <meta
          name="keywords"
          content="auto, vehicle, car, services, autodaddy"
        />
        <link rel="canonical" href="https://autodaddy.co.uk/" />
      </Helmet>
      <div className="landing-container">

        <div className="landing-main">

          <div className="landing-header-container">
            <div className="landing-logo-title-container">
              <img
                className="landing-logo"
                src={`${process.env.PUBLIC_URL}/icons/autodaddy-logo.svg`}
                alt="Logo"
              />
              <h2 className="landing-title" onClick={() => navigate("/")}>
                AutoDaddy
              </h2>
            </div>


            {isMobile ? (
              <div className="landing-menu-button">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2, display: { sm: "none" }, color: "black" }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            ) : (
              <div className="landing-button-login-container">
                {user ? (
                  <button
                    className="landing-button-login"
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </button>
                ) : (
                  <button
                    className="landing-button-login"
                    onClick={handleModalOpen}
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>

          <img
            src="/page-images/floating-nut.png"
            alt="nut"
            className="floating-nut"
          />
          <LandingBody />
          <img
            src="/page-images/floating-plus.png"
            alt="plus"
            className="floating-plus"
          />
          <LandingFooter />

        </div>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
        {isMobile && (
          <SwipeableDrawer
            className="landing-drawer"
            anchor="right"
            open={drawerOpen}
            onClose={handleDrawerClose}
            onOpen={handleDrawerOpen}
            sx={{
              "& .MuiDrawer-paperAnchorLeft, & .MuiDrawer-paperAnchorRight": {
                width: "50%",
              },
            }}
          >
            <div>
              <List>
                <div>
                  {user ? (
                    <>
                      <Button
                        color="inherit"
                        onClick={() => navigate("/dashboard")}
                        sx={{
                          color: "black",
                          fontSize: "14px",
                          mr: "16px",
                        }}
                      >
                        Dashboard
                      </Button>
                    </>
                  ) : (
                    <Button
                      color="inherit"
                      onClick={handleModalOpen}
                      sx={{
                        color: "black",
                        fontSize: "14px",
                        mr: "16px",
                      }}
                    >
                      Login
                    </Button>
                  )}
                </div>
              </List>
            </div>
          </SwipeableDrawer>
        )}
        <Modal
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            {!user && formType === "login" && (
              <LoginForm
                setFormType={setFormType}
                loginEmail={loginEmail}
                setLoginEmail={setLoginEmail}
                loginPassword={loginPassword}
                setLoginPassword={setLoginPassword}
                setOpen={setOpen}
                page="landing"
              />
            )}
            {!user && formType === "register" && (
              <RegisterForm
                setFormType={setFormType}
                registerName={registerName}
                setRegisterName={setRegisterName}
                registerEmail={registerEmail}
                setRegisterEmail={setRegisterEmail}
                registerPassword={registerPassword}
                setRegisterPassword={setRegisterPassword}
                setOpen={setOpen}
                page="landing"
              />
            )}
          </div>
        </Modal>
      </div>
    </>
  );
}

export default LandingPage;
