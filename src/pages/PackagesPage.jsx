import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AppContext } from "../appContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import "./PackagesPage.css";
import CheckoutForm from "../components/CheckoutForm";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Close from "@mui/icons-material/Close";

const auth = getAuth();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const PackagesPage = () => {
  const { vehicleFreeData, setVehicleFreeData } = useContext(AppContext);
  const [_, setPrice] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [open, setOpen] = React.useState(false);
  const [user, loading] = useAuthState(auth);
  const [formType, setFormType] = useState("login");
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    logInWithEmailAndPassword(loginEmail, loginPassword);
  };

  const handleRegister = () => {
    if (!registerName) {
      alert("Please enter name");
      return;
    }
    registerWithEmailAndPassword(registerName, registerEmail, registerPassword);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (price, vehicleFreeData) => {
    setOpen(true);
    setPrice(price);

    if (typeof vehicleFreeData === "undefined") {
      alert("Please enter a license plate number.");
      navigate("/");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": process.env.REACT_APP_YOUR_DOMAIN,
      },
      body: JSON.stringify({
        price,
        vehicleFreeData,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  };

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="packages-page">
      <h1 className="packages-page-title">Packages</h1>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="grid-container"
      >
        <Grid item xs={12} sm={6}>
          <Box className="card-wrapper">
            <Card className="card card-first">
              <Box className="card-header">
                <CardContent>
                  <Box className="card-title">
                    <Typography variant="h5" component="div">
                      Full Check
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      Price: £9
                    </Typography>
                  </Box>
                </CardContent>
              </Box>
              <Box className="card-body">
                <CardContent>
                  <ul className="custom-bullet-points">
                    <li>Random text 1</li>
                  </ul>
                </CardContent>
                <CardActions>
                  <Box className="card-action">
                    <Button
                      onClick={() => handleSubmit(900, vehicleFreeData)}
                      type="submit"
                      variant="contained"
                    >
                      Purchase
                    </Button>
                  </Box>
                </CardActions>
              </Box>
            </Card>
          </Box>
        </Grid>
      </Grid>
      {clientSecret && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modal-content">
            {!user && formType === "login" && (
              <>
                <input
                  type="text"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="E-mail Address"
                />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                />
                <button onClick={handleLogin}>Login</button>
                <button onClick={() => setFormType("register")}>
                  Switch to Register
                </button>
              </>
            )}
            {!user && formType === "register" && (
              <>
                <input
                  type="text"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="E-mail Address"
                />
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Password"
                />
                <button onClick={handleRegister}>Register</button>
                <button onClick={() => setFormType("login")}>
                  Switch to Login
                </button>
              </>
            )}
            {user && (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm userEmail={auth.currentUser.email} />
                </Elements>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PackagesPage;
