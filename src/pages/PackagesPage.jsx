import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { AppContext } from "../appContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";

import { Button } from "@mui/material";
import "./PackagesPage.css";
import CheckoutForm from "../components/CheckoutForm";
import Modal from "@mui/material/Modal";

const auth = getAuth();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const PackagesPage = () => {
  const { vehicleFreeData } = useContext(AppContext);
  const [clientSecret, setClientSecret] = useState("");
  const [open, setOpen] = React.useState(false);
  const [user, loading] = useAuthState(auth);
  const [formType, setFormType] = useState("login");

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!registerName) {
      alert("Please enter name");
      return;
    }
    registerWithEmailAndPassword(registerName, registerEmail, registerPassword);
  };

  const handleSubmit = (price, vehicleFreeData) => {
    setOpen(true);

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

  return (
    <div className="packages-page">
      <div className="main-container">
        <div className="freedata-container">
          {vehicleFreeData.registrationNumber && (
            <div>Registration Number{vehicleFreeData.registrationNumber}</div>
          )}
          {vehicleFreeData.make && <div>Make: {vehicleFreeData.make}</div>}
          {vehicleFreeData.colour && (
            <div>Colour: {vehicleFreeData.colour}</div>
          )}
          {vehicleFreeData.fuelType && (
            <div>Fuel Type: {vehicleFreeData.fuelType}</div>
          )}
          {vehicleFreeData.monthOfFirstRegistration && (
            <div>
              Date of Registration: {vehicleFreeData.monthOfFirstRegistration}
            </div>
          )}
          {vehicleFreeData.enginerCapacity && (
            <div>Engine Capacity: {vehicleFreeData.enginerCapacity}</div>
          )}
          {vehicleFreeData.co2Emissions && (
            <div>CO2 Emissions: {vehicleFreeData.co2Emissions}</div>
          )}
          {vehicleFreeData.dateofLastV5Issued && (
            <div>
              Date of Last V5 Issued: {vehicleFreeData.dateofLastV5Issued}
            </div>
          )}
          {vehicleFreeData.markedForExport && (
            <div>Marked for Export: {vehicleFreeData.markedForExport}</div>
          )}
          {vehicleFreeData.motExpiryDate && (
            <div>MOT Expiry Date: {vehicleFreeData.motExpiryDate}</div>
          )}
          {vehicleFreeData.motStatus && (
            <div>MOT Status: {vehicleFreeData.motStatus}</div>
          )}
          {vehicleFreeData.taxDueDate && (
            <div>Tax Due Date: {vehicleFreeData.taxDueDate}</div>
          )}
          {vehicleFreeData.taxStatus && (
            <div>Tax Status: {vehicleFreeData.taxStatus}</div>
          )}
          {vehicleFreeData.wheelPlan && (
            <div>Wheel Plan: {vehicleFreeData.wheelPlan}</div>
          )}
        </div>
        <div className="package-container">
          <h3>Buy the Full Package</h3>
          <h2>£9</h2>
          <div className="package-list">
            <div>Full Vehicle History</div>
            <div>Full MOT History</div>
            <div>Full Tax History</div>
            <div>Full Mileage History</div>
            <div>Full Owner History</div>
            <div>Full Finance History</div>
            <div>Full Import/Export History</div>
            <div>Full Stolen History</div>
            <div>Full Write-off History</div>
            <div>Full Scrape History</div>
            <div>Full Plate Change History</div>
            <div>Full Colour Change History</div>
            <div>Full Keeper Change History</div>
          </div>
          <Button
            onClick={() => handleSubmit(900, vehicleFreeData)}
            type="submit"
            variant="contained"
          >
            Purchase
          </Button>
        </div>
      </div>
      {clientSecret && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div>
            {!user && formType === "login" && (
              <div className="modal-content-auth">
                <input
                  type="text"
                  className="modal-content-auth-input"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="E-mail Address"
                />
                <input
                  type="password"
                  className="modal-content-auth-input"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                />
                <a
                  className="modal-content-auth-forgotPassword"
                  href="/auth/reset"
                >
                  Forgot Password?
                </a>
                <button
                  className="modal-content-auth-btn"
                  onClick={() =>
                    logInWithEmailAndPassword(loginEmail, loginPassword)
                  }
                >
                  Login
                </button>
                <button
                  className="modal-content-auth-google"
                  onClick={signInWithGoogle}
                >
                  <img
                    alt="Google Logo"
                    className="modal-content-auth-google-logo"
                    src={`${process.env.PUBLIC_URL}/google-logo.png`}
                  ></img>
                </button>
                <button
                  className="modal-content-auth-link-simple"
                  onClick={() => setFormType("register")}
                >
                  <span className="modal-content-auth-text-grey">
                    Not registered yet?
                  </span>
                  <span className="modal-content-auth-text-bold">
                    {" "}
                    Create Account
                  </span>
                </button>
              </div>
            )}
            {!user && formType === "register" && (
              <div className="modal-content-auth">
                <input
                  type="text"
                  className="modal-content-auth-input"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  className="modal-content-auth-input"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  placeholder="E-mail Address"
                />
                <input
                  type="password"
                  className="modal-content-auth-input"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  placeholder="Password"
                />
                <button
                  className="modal-content-auth-btn"
                  onClick={handleRegister}
                >
                  Register
                </button>
                <button
                  className="modal-content-auth-google"
                  onClick={signInWithGoogle}
                >
                  <img
                    alt="Google Logo"
                    className="modal-content-auth-google-logo"
                    src={`${process.env.PUBLIC_URL}/google-logo.png`}
                  ></img>
                </button>
                <button
                  className="modal-content-auth-link-simple"
                  onClick={() => setFormType("login")}
                >
                  <span className="modal-content-auth-text-grey">
                    Already have an account?
                  </span>
                  <span className="modal-content-auth-text-bold"> Login</span>
                </button>
              </div>
            )}

            {user && (
              <div className="modal-content-checkout">
                <Elements
                  options={{
                    clientSecret,
                    theme: "stripe",
                  }}
                  stripe={stripePromise}
                >
                  <CheckoutForm userEmail={auth.currentUser.email} />
                </Elements>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PackagesPage;
