import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Snackbar,
  SwipeableDrawer,
  Button,
  List,
  IconButton,
} from "@mui/material";

import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import confetti from "canvas-confetti";

import { AppContext } from "../../appContext";
import { VehicleFreeData } from "../../models/VehicleFreeData";
import CarLoader from "../../SVGs/CarLoader";
import "./RegSearchForm.css";

function RegSearchForm() {
  const {
    setRegistrationNumber,
    vehicleFreeData,
    setVehicleFreeData,
    setPreviousPage,
  } = useContext(AppContext);
  const [user, loading] = useAuthState(auth);
  const [open, setOpen] = React.useState(false);
  const [pattern] = useState(/^[A-Za-z0-9]{1,7}$/);
  const [tempRegistrationNumber, setTempRegistrationNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const navigate = useNavigate();



  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (pattern.test(tempRegistrationNumber.replace(/\s/g, ""))) {
      setIsValid(true);
      setIsLoading(true);
      try {
        await axios
          .post(
            `${
              process.env.REACT_APP_API_URL
            }/dvla/${tempRegistrationNumber.replace(/\s/g, "")}`
          )
          .then((res) => {
            const vehicleFreeData = new VehicleFreeData(res.data);
            setVehicleFreeData(vehicleFreeData);
            setRegistrationNumber(vehicleFreeData.registrationNumber);
            setResponseStatus(true);
            setIsLoading(false);

            confetti({
              particleCount: 20,
              spread: 50,
              startVelocity: 20,
            });
          });
      } catch (error) {
        setSnackbarMessage(error.response.data.message);
        setSnackbarOpen(true);
        setResponseStatus(false);
        setIsLoading(false);
      }
      setSnackbarMessage("Invalid UK license plate number");

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
  }, [isValid, isSubmitted, responseStatus, navigate, vehicleFreeData, user]);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <div>
      <form className="landing-form" onSubmit={handleSubmit}>
        <div className="landing-GB">
          <span>GB</span>
        </div>
        <input
          type="text"
          className="landing-input"
          placeholder="REG Number"
          value={tempRegistrationNumber}
          onChange={(event) =>
            setTempRegistrationNumber(event.target.value.toUpperCase())
          }
          style={{ textTransform: "uppercase", fontWeight: "bold" }}
        />
        <button type="submit" className="landing-button-go">
          GO
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

export default RegSearchForm;
