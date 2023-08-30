import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth } from "firebase/auth";
import { Link, Snackbar } from "@mui/material";
import { AppContext } from "../../appContext";
import "./PackagePageLeft.css";
import StatusWindow from "./VehicleData/StatusWindow";
import TableRow from "./VehicleData/TableRow";
import RegSearchFormAgain from "../Components/RegSearchForm/RegSearchFormAgain";

const auth = getAuth();

const PackagePageLeft = () => {
  const {
    vehicleFreeData,
    setPreviousPage,
  } = useContext(AppContext);

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
      <div className="package-left">
        <div>
   
          <div className="package-left-form-container">
            
            <RegSearchFormAgain />
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
