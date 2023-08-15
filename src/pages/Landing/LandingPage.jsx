import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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

import { AppContext } from "../../appContext";
import { VehicleFreeData } from "../../models/VehicleFreeData";
import CarLoader from "../../SVGs/CarLoader";
import "./LandingPage.css";

import Modal from "@mui/material/Modal";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

function LandingPage() {
  const {
    setRegistrationNumber,
    vehicleFreeData,
    setVehicleFreeData,
    setPreviousPage,
  } = useContext(AppContext);
  const [user, loading] = useAuthState(auth);
  // const user = auth.currentUser;
  const [open, setOpen] = React.useState(false);
  const [pattern] = useState(/^[A-Za-z0-9]{1,7}$/);
  const [tempRegistrationNumber, setTempRegistrationNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [formType, setFormType] = useState("login");

  const handleModalClose = () => {
    setModalOpen(false);
  };

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
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (pattern.test(tempRegistrationNumber)) {
      setIsValid(true);
      setIsLoading(true);
      try {
        await axios
          .post(
            `${
              process.env.REACT_APP_API_URL
            }/dvla/${tempRegistrationNumber.replace(/\s/g, "")}`
          )
          .then((res) => {
            const vehicleFreeData = new VehicleFreeData(res.data);
            setVehicleFreeData(vehicleFreeData);
            setRegistrationNumber(vehicleFreeData.registrationNumber);
            setResponseStatus(true);
            setIsLoading(false);
          });
      } catch (error) {
        setSnackbarMessage(error.response.data.message);
        setSnackbarOpen(true);
        setResponseStatus(false);
        setIsLoading(false);
      }
    } else {
      setIsValid(false);
      setSnackbarMessage("Invalid UK license plate number");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (isValid && isSubmitted && responseStatus) {
      setPreviousPage("/packages");
      navigate("/packages", { state: { vehicleFreeData } });
    } else {
      setPreviousPage("/");
    }
  }, [isValid, isSubmitted, responseStatus, navigate, vehicleFreeData, user]);

  if (isLoading) {
    return (
      <div className="landing-loader">
        <CarLoader />
      </div>
    );
  }

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
    <div className="landing-container">
      <div className="landing-left">
        <div className="landing-header-container">
          <h2 className="landing-logo" onClick={() => navigate("/")}>
            AutoDaddy
          </h2>
          {isMobile && (
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
          )}
        </div>
        <div className="landing-form-container">
          <h2 className="landing-title">
            Your AI Copilot in car buying decisions
          </h2>
          <p className="landing-description">
            Guiding your car-buying journey with deep data dives, insights and
            comprehensive reports!
          </p>

          <form className="landing-form" onSubmit={handleSubmit}>
            <div className="landing-GB">
              <span>GB</span>
            </div>
            <input
              type="text"
              className="landing-input"
              placeholder="License Plate"
              value={tempRegistrationNumber}
              onChange={(event) =>
                setTempRegistrationNumber(event.target.value)
              }
            />
            <button type="submit" className="landing-button-go">
              Go
            </button>
          </form>
        </div>
        <div className="landing-footer-container">
          <div className="landing-logos-container">
            <img
              className="landing-logo"
              src={`${process.env.PUBLIC_URL}/logos/openai-logo.png`}
              alt="Logo"
            />
            <img
              className="landing-logo"
              src={`${process.env.PUBLIC_URL}/logos/ukvd-logo.svg`}
              alt="Logo"
            />
            <img
              className="landing-logo"
              src={`${process.env.PUBLIC_URL}/logos/replit-logo.svg`}
              alt="Logo"
            />
            <img
              className="landing-logo"
              src={`${process.env.PUBLIC_URL}/logos/dvla-logo.png`}
              alt="Logo"
            />
            <img
              className="landing-logo"
              src={`${process.env.PUBLIC_URL}/logos/applepay-logo.svg`}
              alt="Logo"
            />
            <img
              className="landing-logo"
              src={`${process.env.PUBLIC_URL}/logos/stripe-logo.svg`}
              alt="Logo"
            />
            <img
              className="landing-logo"
              src={`${process.env.PUBLIC_URL}/logos/paypal-logo.svg`}
              alt="Logo"
            />
          </div>
          <div className="landing-footer">
            <Link to="/privacy">Privacy</Link> |
            <Link to="/terms">Terms and Conditions</Link> |
            <Link to="/cookies">Cookies</Link> |<Link to="/gdpr">GDPR</Link> |
            <Link to="/contactus">Contact Us</Link>
          </div>
          <div className="landing-copyright">© 2023 AutoDaddy</div>
        </div>
      </div>
      {!isMobile &&
        (user ? (
          <div className="landing-right">
            <div className="landing-right-video-container">
              <img
                className="landing-right-video"
                src={`${process.env.PUBLIC_URL}/landing-page-video-1.gif`}
                alt="Logo"
              />
            </div>
            <div className="landing-button-login-container">
              <button
                className="landing-button-login"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="landing-right">
            <div className="landing-button-login-container">
              <button
                className="landing-button-login"
                onClick={handleModalOpen}
              >
                Login
              </button>
            </div>
          </div>
        ))}
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
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default LandingPage;
