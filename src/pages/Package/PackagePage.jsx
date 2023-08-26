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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (pattern.test(registrationNumber.replace(/\s/g, ""))) {
      setIsValid(true);
      setIsLoading(true);
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/dvla/${registrationNumber.replace(
              /\s/g,
              ""
            )}`
          )
          .then((res) => {
            const vehicleFreeData = new VehicleFreeData(res.data);
            setVehicleFreeData(vehicleFreeData);
            setRegistrationNumber(registrationNumber);
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
        <div className="package-left">
          <div>
            <div className="package-left-header-container">
              <img
                onClick={() => navigate("/")}
                src="/logos/logo.png"
                alt="logo"
                height={40}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="package-left-form-container">
              <form className="package-left-form" onSubmit={handleSubmit}>
                <div className="package-left-input-container">
                  <div className="package-left-GB">
                    <span>GB</span>
                  </div>
                  <input
                    type="text"
                    className="package-left-input"
                    placeholder="License Plate"
                    value={registrationNumber}
                    onChange={(event) =>
                      setRegistrationNumber(event.target.value)
                    }
                  />
                </div>
                <button type="submit" className="package-left-button-go">
                  Check again
                </button>
              </form>
            </div>
            <div className="package-left-content-container">
              <div className="package-left-carmake-container">
                {vehicleFreeData.make}
              </div>
              <div className="package-left-tax-and-mot-container">
                <StatusWindow
                  title={"TAX"}
                  dueDate={vehicleFreeData.taxDueDate}
                  status={vehicleFreeData.taxStatus}
                />
                <StatusWindow
                  title={"MOT"}
                  dueDate={vehicleFreeData.motExpiryDate}
                  status={vehicleFreeData.motStatus}
                />
              </div>
              <div className="package-left-other-details-container">
                <TableRow
                  item={vehicleFreeData.monthOfFirstRegistration}
                  title="Registration Date:"
                  colour="#6f508c"
                  last={false}
                >
                  {vehicleFreeData.monthOfFirstRegistration}
                </TableRow>
                <TableRow
                  item={vehicleFreeData.colour}
                  title="Colour:"
                  colour="#6f508c"
                  last={false}
                >
                  {vehicleFreeData.colour}
                </TableRow>
                <TableRow
                  item={vehicleFreeData.fuelType}
                  title="Fuel Type:"
                  colour="#6f508c"
                  last={false}
                >
                  {vehicleFreeData.fuelType}
                </TableRow>
                <TableRow
                  item={vehicleFreeData.co2Emissions}
                  title="CO2 emissions:"
                  colour="#6f508c"
                  last={true}
                >
                  {vehicleFreeData.co2Emissions}
                </TableRow>
              </div>
            </div>
          </div>
          {isMobile ? (
            <></>
          ) : (
            <div className="package-left-footer-container">
              <div className="package-left-logos-container">
                <img
                  className="package-left-logo"
                  src={`${process.env.PUBLIC_URL}/logos/openai-logo.png`}
                  alt="Logo"
                />
                <img
                  className="package-left-logo"
                  src={`${process.env.PUBLIC_URL}/logos/ukvd-logo.svg`}
                  alt="Logo"
                />
                <img
                  className="package-left-logo"
                  src={`${process.env.PUBLIC_URL}/logos/replit-logo.svg`}
                  alt="Logo"
                />
                <img
                  className="package-left-logo"
                  src={`${process.env.PUBLIC_URL}/logos/dvla-logo.png`}
                  alt="Logo"
                />
              </div>
              <div className="package-left-footer">
                <a href="/privacy">Privacy</a> |
                <a href="/terms">Terms and Conditions</a>{" "}
                {/* |
              <Link to="/cookies">Cookies</Link> |<Link to="/gdpr">GDPR</Link> */}{" "}
                |<a href="mailto:support@autodaddy.co.uk">Contact Us</a>
              </div>
              <div className="package-left-copyright">© 2023 AutoDaddy</div>
            </div>
          )}
        </div>

        <div className="package-right">
          <div className="package-right-container">
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
                    {user ? (
                      <button
                        className="package-right-header-button"
                        onClick={() => {
                          navigate("/dashboard");
                        }}
                      >
                        Dashboard
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              )}
            </div>
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
              <div
                className="package-right-content-button-container"
                onClick={() =>
                  openCheckoutAndCreatePaymentIntent(920, vehicleFreeData)
                }
              >
                Get Full Report{" "}
                <span style={{ fontSize: "1.5rem", marginLeft: "0.5rem" }}>
                  £9.20
                </span>
              </div>
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
          </div>
        </div>
        {isMobile ? (
          <div className="package-footer-mobile">
            <div className="package-left-footer">
              <a href="/privacy">Privacy</a> |
              <a href="/terms">Terms and Conditions</a>{" "}
              {/* |
            <Link to="/cookies">Cookies</Link> |<Link to="/gdpr">GDPR</Link>  */}
              |<a href="mailto:support@autodaddy.co.uk">Contact Us</a>
            </div>
            <div className="package-left-copyright">© 2023 AutoDaddy</div>
          </div>
        ) : (
          <></>
        )}
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
                  <div className="package-pay-left-logo">AutoDaddy</div>
                  <div className="package-pay-left-title">Full Car Report</div>
                  <div className="package-pay-left-description">
                    Receive a detailed report with all of ChatGPT's insights,
                    equipping you with the knowledge you need for a confident
                    purchase decision.
                  </div>
                  <div className="package-pay-left-subtitle">
                    For License Plate {registrationNumber}
                  </div>
                  <div className="package-pay-left-cost">
                    Total
                    <span className="package-pay-left-cost-price">£9.20</span>
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
      </div>
      <Chat />
    </>
  );
};

export default PackagePage;
