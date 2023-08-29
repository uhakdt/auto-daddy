import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Helmet } from "react-helmet";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { RiCarLine } from "react-icons/ri";

import Modal from "@mui/material/Modal";
import { Link, Snackbar } from "@mui/material";

import { AppContext } from "../../appContext";

import StripeForm from "./Checkout/StripeForm";
import LoginForm from "../../components/LoginForm";
import RegisterForm from "../../components/RegisterForm";

import "./PackagePage.css";

import { VehicleFreeData } from "../../models/VehicleFreeData";
import StatusWindow from "./VehicleData/StatusWindow";
import TableRow from "./VehicleData/TableRow";
import FullReportList from "./GetFullReport/FullReportList";

import Chat from "./Chat/Chat";

import { handleDownloadSampleReport } from "../../hooks/reportHooks";
import PackagePageLeft from "./PackagePageLeft";
import PackagePagePay from "./PackagePagePay";

const auth = getAuth();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const initialOptions = {
  "client-id":
    "AeEuJ4sFBulMy2T3rCl60TOmWoIf3_ub1AUmUU-Cdg6M7fR32BSvR8Ij93A4lwe3LEkByX3YGXfUtlTr",
  currency: "GBP",
  intent: "capture",
};

const iconsUrl = process.env.PUBLIC_URL + "/icons/";

const PackagePage = () => {
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
      <Helmet>
        <title>AutoDaddy | Full Car History Report</title>
        <meta
          name="description"
          content="AutoDaddy's Full Car History Report: Get comprehensive details about any vehicle and consult ChatGPT for insights and queries."
        />
        <meta
          name="keywords"
          content="auto, vehicle, car, history, report, autodaddy, ChatGPT, details, insights"
        />
        <link rel="canonical" href="https://autodaddy.co.uk/package" />
      </Helmet>
      <div className="package-container">
        <PackagePageLeft />

        <div className="package-right">
          <div className="package-right-container">
            <div className="package-right-content">
              <div className="package-right-content-title">
                Get your complete car history report and ask ChatGPT any
                questions you have about it.
              </div>
              <div className="package-right-content-divider"></div>
              <div className="package-right-content-list-openai-container">
                <FullReportList />
                {/* {isMobile ? (
                <></>
              ) : (
                <img
                  alt="Google"
                  src={iconsUrl + "icon_plus_small.png"}
                  height={40}
                />
              )} */}
                <div className="package-right-content-openai">
                  <img
                    className="package-right-content-openai-logo"
                    src={`${process.env.PUBLIC_URL}/logos/chatgpt-logo.png`}
                    alt="Logo"
                  />
                </div>
              </div>
              <PackagePagePay />
            </div>
            <div className="package-right-header">
              {isMobile ? (
                <>
                  <div className="package-right-header-button-container">
                    <button
                      className="package-right-header-button"
                      onClick={handleDownloadSampleReport}
                    >
                      View sample report
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="package-right-header-icon"></div>
                  <div className="package-right-header-button-container">
                    <button
                      className="package-right-header-button"
                      onClick={handleDownloadSampleReport}
                    >
                      View sample report
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="package-right-logos-container">
              <img
                className="package-right-logo"
                src={`${process.env.PUBLIC_URL}/logos/visa-logo.png`}
                alt="Logo"
              />
              <img
                className="package-right-logo"
                src={`${process.env.PUBLIC_URL}/logos/mastercard-logo.png`}
                alt="Logo"
              />
              <img
                className="package-right-logo"
                src={`${process.env.PUBLIC_URL}/logos/applepay-logo.svg`}
                alt="Logo"
              />
              <img
                className="package-right-logo"
                src={`${process.env.PUBLIC_URL}/logos/stripe-logo.svg`}
                alt="Logo"
              />
              <img
                className="package-right-logo"
                src={`${process.env.PUBLIC_URL}/logos/paypal-logo.svg`}
                alt="Logo"
              />
            </div>
            <div className="package-footer-mobile">
              <div className="package-left-footer">
                <a href="/privacy">Privacy</a> |
                <a href="/terms">Terms and Conditions</a>{" "}
                {/* |
            <Link to="/cookies">Cookies</Link> |<Link to="/gdpr">GDPR</Link>  */}
                |<a href="mailto:main@autodaddy.co.uk">Contact Us</a>
              </div>
              <div className="package-left-copyright">© 2023 AutoDaddy</div>
            </div>
       
          </div>
        </div>
       
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          key={"top-center"}
        />
      </div>
      
      {/*   <Chat /> */}
    </>
  );
};

export default PackagePage;
