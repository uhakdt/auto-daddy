import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Modal from "@mui/material/Modal";
import { Link, Snackbar } from "@mui/material";

import { AppContext } from "../../appContext";

import StripeForm from "./Checkout/StripeForm";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

import "./PackagePagePay.css";

import { VehicleFreeData } from "../../models/VehicleFreeData";

const auth = getAuth();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const initialOptions = {
  "client-id":
    "AeEuJ4sFBulMy2T3rCl60TOmWoIf3_ub1AUmUU-Cdg6M7fR32BSvR8Ij93A4lwe3LEkByX3YGXfUtlTr",
  currency: "GBP",
  intent: "capture",
};

const iconsUrl = process.env.PUBLIC_URL + "/icons/";

const PackagePagePay = () => {
  const {
    registrationNumber,
    setRegistrationNumber,
    vehicleFreeData,
    setVehicleFreeData,
    setPreviousPage,
  } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [user, loading] = useAuthState(auth);

  // Registration Form states
  const [pattern] = useState(/^[A-Z]{2}\d{2}\s?[A-Z]{3}$/i);
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Payment Form states
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");

  const [formType, setFormType] = useState("login");
  const [payments, setPayments] = useState(false);

  const navigate = useNavigate();

  const openCheckoutAndCreatePaymentIntent = (price, vehicleFreeData) => {
    setOpen(true);
    setPayments(true);

    if (typeof vehicleFreeData === "undefined") {
      alert("Please enter a license plate number.");
      navigate("/");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/stripe/create-payment-intent`, {
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
      .then((data) => {
        setPaymentIntentId(data.paymentIntentId);
        setClientSecret(data.clientSecret);
      });
  };

  useEffect(() => {
    if (isValid && isSubmitted && responseStatus) {
      setSnackbarMessage("All good!");
      setSnackbarOpen(true);
      setPreviousPage("/packages");
      navigate("/packages", { state: { vehicleFreeData } });
    } else {
      setPreviousPage("/");
    }
  }, [isValid, isSubmitted, responseStatus, navigate, vehicleFreeData]);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <>
      <div
        className="package-right-content-button-container"
        onClick={() =>
          openCheckoutAndCreatePaymentIntent(1980, vehicleFreeData)
        }
      >
        Get Full Report
      </div>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setPayments(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          {!user && formType === "login" && (
            <LoginForm
              setFormType={setFormType}
              setOpen={setOpen}
              page="package"
            />
          )}
          {!user && formType === "register" && (
            <RegisterForm
              setFormType={setFormType}
              setOpen={setOpen}
              page="package"
            />
          )}
          {user && payments && (
            <div className="package-pay-container">
              <div className="package-pay-left-container">
                <div className="package-pay-left-logo">
                  <img
                    src="/logos/logo.png"
                    alt="logo"
                    height={40}
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <div className="package-pay-left-title">
                  Full Car History + GPT Unlocked
                </div>

                <div className="package-pay-left-subtitle">
                  <span className="package-pay-left-subtitle-text">
                    Make: {vehicleFreeData.make}
                  </span>
                  <span className="package-pay-left-subtitle-line"></span>
                  <span className="package-pay-left-subtitle-reg">
                    Reg: {registrationNumber}
                  </span>
                </div>

                <div className="package-pay-left-cost">
                  <span className="package-pay-left-cost-name"> Price:</span>
                  <span className="package-pay-left-cost-price">£19.80</span>
                </div>

                <div className="package-pay-left-footer">
                  Powered by
                  <span className="package-pay-left-stripe-logo">stripe</span>
                  <div className="package-pay-left-footer-divider"></div>
                  <a href="/terms">Terms</a>
                  <a href="/privacy">Privacy</a>
                </div>
              </div>

              <div className="package-pay-right-container">
                <div className="package-pay-right-content">
                  {clientSecret && (
                    <Elements
                      options={{
                        clientSecret,
                        theme: "stripe",
                      }}
                      stripe={stripePromise}
                    >
                      <StripeForm paymentIntentId={paymentIntentId} />
                    </Elements>
                  )}
                </div>
                <div
                  className="package-pay-right-button-close"
                  onClick={() => {
                    setOpen(false);
                    setPayments(false);
                  }}
                >
                  <img
                    alt="close"
                    src={iconsUrl + "close.svg"}
                    onClick={() => setOpen(false)}
                    height={20}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        key={"top-center"}
      />

      {/*   <Chat /> */}
    </>
  );
};

export default PackagePagePay;
