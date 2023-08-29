import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Snackbar } from "@mui/material";
import { AppContext } from "../../appContext";
import "./PackagePageLeft.css";
import { VehicleFreeData } from "../../models/VehicleFreeData";
import StatusWindow from "./VehicleData/StatusWindow";
import TableRow from "./VehicleData/TableRow";

const auth = getAuth();

const PackagePageLeft = () => {
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
        {/* {isMobile ? (
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
          </div>
        )} */}
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

export default PackagePageLeft;
