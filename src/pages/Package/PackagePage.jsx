import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { RiCarLine } from "react-icons/ri";

import Modal from "@mui/material/Modal";
import { Link, Snackbar } from "@mui/material";

import { AppContext } from "../../appContext";

import StripeForm from "./Checkout/StripeForm";
import PayPalForm from "./Checkout/PayPalForm";
import PayByStripeButton from "./Checkout/PayByStripeButton";
import LoginForm from "./Auth/LoginForm";
import RegisterForm from "./Auth/RegisterForm";

import "./PackagePage.css";

import { VehicleFreeData } from "../../models/VehicleFreeData";
import StatusWindow from "./VehicleData/StatusWindow";
import TableRow from "./VehicleData/TableRow";

const auth = getAuth();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const initialOptions = {
  "client-id":
    "AeEuJ4sFBulMy2T3rCl60TOmWoIf3_ub1AUmUU-Cdg6M7fR32BSvR8Ij93A4lwe3LEkByX3YGXfUtlTr",
  currency: "GBP",
  intent: "capture",
};

const PackagePage = () => {
  const { vehicleFreeData, setVehicleFreeData, setPreviousPage } =
    useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [user, loading] = useAuthState(auth);
  console.log(vehicleFreeData);

  // Registration Form states
  const [pattern] = useState(/^[A-Z]{2}\d{2}\s?[A-Z]{3}$/i);
  const [registrationNumber, setRegistrationNumber] = useState("");
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
  const [formType, setFormType] = useState("login");
  const [payments, setPayments] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  // Auth Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const navigate = useNavigate();

  const handleDrive = () => {
    setOpen(true);
    setPayments(true);

    if (typeof vehicleFreeData === "undefined") {
      alert("Please enter a license plate number.");
      navigate("/");
      return;
    }
  };

  const handleStripeSubmit = (price, vehicleFreeData) => {
    setPaymentMethod("");
    setPayments(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (pattern.test(registrationNumber)) {
      setIsValid(true);
      setIsLoading(true);
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/vehicledata/free/${registrationNumber}`
          )
          .then((res) => {
            const vehicleFreeData = new VehicleFreeData(res.data);
            setVehicleFreeData(vehicleFreeData);
            setResponseStatus(true);
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error);
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
  }, [isValid, isSubmitted, responseStatus, navigate, vehicleFreeData]);

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <div className="package-container">
      <div className="package-left">
        <div>
          <div className="package-header-container">
            <h2 onClick={() => navigate("/")} className="package-logo">
              AutoDaddy
            </h2>
          </div>
          <div className="package-form-container">
            <form className="package-form" onSubmit={handleSubmit}>
              <div className="package-input-container">
                <div className="package-GB">
                  <span>GB</span>
                </div>
                <input
                  type="text"
                  className="package-input"
                  placeholder="License Plate"
                  value={registrationNumber}
                  onChange={(event) =>
                    setRegistrationNumber(event.target.value)
                  }
                />
              </div>
              <button type="submit" className="package-button-go">
                Check again
              </button>
            </form>
          </div>
          <div className="package-content-container">
            <div className="package-carmake-container">
              <RiCarLine color="#6f508c" size={22} />
              {vehicleFreeData.make}
            </div>
            <div className="package-tax-and-mot-container">
              <StatusWindow
                title={"TAX"}
                dueDate={vehicleFreeData.taxDueDate}
                status={vehicleFreeData.taxStatus}
                colour={
                  vehicleFreeData.taxStatus === "Taxed" ? "#6f508c" : "#d55a6f"
                }
              />
              <StatusWindow
                title={"MOT"}
                dueDate={vehicleFreeData.motExpiryDate}
                status={vehicleFreeData.motStatus}
                colour={
                  vehicleFreeData.motStatus === "Valid" ? "#6f508c" : "#d55a6f"
                }
              />
              <div className="package-mot-container"></div>
            </div>
            <div className="package-other-details-container">
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
          <div className="package-footer-container">
            <div className="package-logos-container">
              <img
                className="package-logo"
                src={`${process.env.PUBLIC_URL}/logos/openai-logo.png`}
                alt="Logo"
              />
              <img
                className="package-logo"
                src={`${process.env.PUBLIC_URL}/logos/ukvd-logo.svg`}
                alt="Logo"
              />
              <img
                className="package-logo"
                src={`${process.env.PUBLIC_URL}/logos/replit-logo.svg`}
                alt="Logo"
              />
              <img
                className="package-logo"
                src={`${process.env.PUBLIC_URL}/logos/dvla-logo.png`}
                alt="Logo"
              />
            </div>
            <div className="package-footer">
              <Link to="/privacy">Privacy</Link> |
              <Link to="/terms">Terms and Conditions</Link> |
              <Link to="/cookies">Cookies</Link> |<Link to="/gdpr">GDPR</Link> |
              <Link to="/contactus">Contact Us</Link>
            </div>
            <div className="package-copyright">© 2023 AutoDaddy</div>
          </div>
        )}
      </div>

      <div className="package-right"></div>

      {/* <div className="freedata-container">
        {vehicleFreeData.registrationNumber && (
          <div>Registration Number{vehicleFreeData.registrationNumber}</div>
        )}
        {vehicleFreeData.make && <div>Make: {vehicleFreeData.make}</div>}
        {vehicleFreeData.colour && <div>Colour: {vehicleFreeData.colour}</div>}
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
      <div className="drive-container">
        <button className="drive-btn" onClick={handleDrive}>
          Drive
        </button>
      </div> */}
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
              loginEmail={loginEmail}
              setLoginEmail={setLoginEmail}
              loginPassword={loginPassword}
              setLoginPassword={setLoginPassword}
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
            />
          )}
          {user && payments && (
            <div className="pay-container">
              <button onClick={() => handleStripeSubmit(1500, vehicleFreeData)}>
                Stripe
              </button>
              <button onClick={() => setPaymentMethod("paypal")}>
                <PayPalScriptProvider options={initialOptions}>
                  <PayPalForm />
                </PayPalScriptProvider>
              </button>
            </div>
          )}

          {user && !payments && clientSecret && (
            <div className="modal-content-checkout" style={{ width: "80%" }}>
              <Elements
                options={{
                  clientSecret,
                  theme: "stripe",
                }}
                stripe={stripePromise}
              >
                <StripeForm userEmail={auth.currentUser.email} />
              </Elements>
            </div>
          )}
        </div>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
};

export default PackagePage;
