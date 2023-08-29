import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { loadStripe } from "@stripe/stripe-js";

import { Link, Snackbar } from "@mui/material";

import { AppContext } from "../../appContext";

import "./PackagePage.css";

import FullReportList from "./GetFullReport/FullReportList";

import { handleDownloadSampleReport } from "../../hooks/reportHooks";

import PackagePagePay from "./PackagePagePay";

const auth = getAuth();



const iconsUrl = process.env.PUBLIC_URL + "/icons/";

const PackagePageRight = () => {
  const {
    vehicleFreeData,
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
      <div className="package-right">
        <div className="package-right-container">
          <div className="package-right-content">
            <div className="package-right-content-title">
              Get your complete car history report and ask ChatGPT any questions
              you have about it.
            </div>
            <div className="package-right-content-divider"></div>
            <div className="package-right-content-list-openai-container">
              <FullReportList />
              {isMobile ? (
                <></>
              ) : (
                <img
                  alt="Google"
                  src={iconsUrl + "icon_plus_small.png"}
                  height={40}
                />
              )}
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
    </>
  );
};

export default PackagePageRight;
