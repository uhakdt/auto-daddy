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
  const { vehicleFreeData, setPreviousPage } = useContext(AppContext);

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
              <table className="details-table">
                <tbody>
                  <tr>
                    <td className="details-table-title">Registration Date:</td>
                    <td className="details-table-item">
                      {vehicleFreeData.monthOfFirstRegistration}
                    </td>
                  </tr>
                  <tr>
                    <td className="details-table-title">Colour:</td>
                    <td className="details-table-item">
                      {vehicleFreeData.colour}
                    </td>
                  </tr>
                  <tr>
                    <td className="details-table-title">Fuel Type:</td>
                    <td className="details-table-item">
                      {vehicleFreeData.fuelType}
                    </td>
                  </tr>
                  <tr>
                    <td className="details-table-title">CO2 emissions:</td>
                    <td className="details-table-item">
                      {vehicleFreeData.co2Emissions}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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

export default PackagePageLeft;
