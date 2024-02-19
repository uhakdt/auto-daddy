import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Snackbar } from "@mui/material";
import { AppContext } from "../../../appContext";
import { VehicleFreeData } from "../../../models/VehicleFreeData";
import "./RegSearchFormAgain.css";

function RegSearchFormAgain() {
  const {
    registrationNumber,
    setRegistrationNumber,
    vehicleFreeData,
    setVehicleFreeData,
    setPreviousPage,
  } = useContext(AppContext);
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

  return (
    <div>
      <form className="landing-form-again" onSubmit={handleSubmit}>
        <div className="landing-GB-again">
          <span>GB</span>
        </div>
        <input
          type="text"
          className="landing-input-again"
          placeholder="License Plate"
          value={registrationNumber}
          onChange={(event) =>
            setRegistrationNumber(event.target.value.toUpperCase())
          }
          style={{ textTransform: "uppercase", fontWeight: "bold" }}
        />
        <button type="submit" className="landing-button-go-again">
          Check Again
        </button>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
}

export default RegSearchFormAgain;
