import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CarLoader from "../../../SVGs/CarLoader";

import axios from "axios";

import { AppContext } from "../../../appContext";

import { VehicleFreeData } from "../../../models/VehicleFreeData";
import "./NewOrder.css";

function NewOrder() {
  const { vehicleFreeData, setVehicleFreeData, setPreviousPage } =
    useContext(AppContext);
  const [pattern] = useState(/^[A-Z]{2}\d{2}\s?[A-Z]{3}$/i);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (pattern.test(registrationNumber)) {
      setIsValid(true);
      try {
        await axios
          .post(`${process.env.REACT_APP_API_URL}/dvla/${registrationNumber}`)
          .then((res) => {
            const vehicleFreeData = new VehicleFreeData(res.data);
            setVehicleFreeData(vehicleFreeData);
            setResponseStatus(true);
          });
      } catch (error) {
        setSnackbarMessage(error.response.data.message);
        setSnackbarOpen(true);
        setResponseStatus(false);
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

  return (
    <div className="new-order">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              id="outlined-basic"
              label="License Plate"
              variant="outlined"
              value={registrationNumber}
              onChange={(event) => setRegistrationNumber(event.target.value)}
              InputProps={{ className: "new-order__text__input" }}
            />
          </Grid>
          <Grid item>
            <button type="submit" className="new-order__button-go">
              Go
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default NewOrder;
