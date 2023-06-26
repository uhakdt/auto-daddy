import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAuthState } from "react-firebase-hooks/auth";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import Modal from "@mui/material/Modal";

import { AppContext } from "../../appContext";

import StripeForm from "./Checkout/StripeForm";
import PayPalForm from "./Checkout/PayPalForm";
import PayByStripeButton from "./Checkout/PayByStripeButton";
import LoginForm from "./Auth/LoginForm";
import RegisterForm from "./Auth/RegisterForm";

import "./PackagePage.css";
import FAQs from "./FAQs";

const auth = getAuth();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);

const initialOptions = {
  "client-id":
    "AeEuJ4sFBulMy2T3rCl60TOmWoIf3_ub1AUmUU-Cdg6M7fR32BSvR8Ij93A4lwe3LEkByX3YGXfUtlTr",
  currency: "GBP",
  intent: "capture",
};

const PackagePage = () => {
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

  const handleStripeSubmit = (price, vehicleFreeData) => {
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
        <div className="pay-container">
          <PayByStripeButton
            onClick={() => handleStripeSubmit(1500, vehicleFreeData)}
          />
          <PayPalScriptProvider options={initialOptions}>
            <PayPalForm />
          </PayPalScriptProvider>
        </div>
        <div className="accuracy-statement-container">
          <h3>Accuracy Statement</h3>
          <p>
            The information provided by this service is not guaranteed to be
            accurate and is provided for informational purposes only. The
            information provided is not intended to replace any official
            documents.
          </p>
        </div>
        <div className="report-container">
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
        </div>
        <div className="logos-container">
          <img
            src={`${process.env.PUBLIC_URL}/logos/ukvd-logo.svg`}
            height={100}
            alt="UKVD"
          />
          <img
            src={`${process.env.PUBLIC_URL}/logos/dvla-logo.svg`}
            height={100}
            alt="UKVD"
          />
        </div>
        <div className="how-it-works-container">
          <h3>How it Works</h3>
          <div>Enter a Vehicle Registration Number</div>
          <div>
            Enter a vehicle registration number to get started. We will search
            our database for the vehicle. Once found, you can purchase the full
            vehicle history, you can do so by clicking the "Buy Full Package"
            button.
          </div>
        </div>
        <FAQs />
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

            {user && (
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
      )}
    </div>
  );
};

export default PackagePage;
