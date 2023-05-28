import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appContext";
import { VehicleFreeData } from "../models/VehicleFreeData";
import { useTheme } from "@mui/material/styles";
import "./LandingPage.css";

function LandingPage() {
  const { vehicleFreeData, setVehicleFreeData, setPreviousPage } =
    useContext(AppContext);
  const [pattern] = useState(/^[A-Z]{2}\d{2}\s?[A-Z]{3}$/i);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsValid(pattern.test(registrationNumber));
    try {
      await axios
        .post(
          `${process.env.REACT_APP_API_URL}/vehicledata/free/${registrationNumber}`
        )
        .then((res) => {
          const vehicleFreeData = new VehicleFreeData(res.data);
          setVehicleFreeData(vehicleFreeData);
          setResponseStatus(true);
        });
    } catch (error) {
      console.log(error);
      setResponseStatus(false);
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
    <Box pt={theme.spacing(20)}>
      <div className="landing__container">
        <h1 className="landing__heading">Search For Your Car</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <div className="landing__GB">
                <span>GB</span>
              </div>
            </Grid>
            <Grid item xs style={{ paddingLeft: "0" }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="License Plate"
                variant="outlined"
                value={registrationNumber}
                onChange={(event) => setRegistrationNumber(event.target.value)}
                InputProps={{
                  className: "landing__text__input",
                }}
              />
            </Grid>
            <Grid item>
              <button type="submit" class="landing__btn">
                Go
              </button>
            </Grid>
          </Grid>
          {isSubmitted && !isValid && <p>Invalid UK license plate number</p>}
        </form>
      </div>
      <img
        className="landing__image"
        src={`${process.env.PUBLIC_URL}/landing-page-image.png`}
        alt="Landing page illustration"
      />
    </Box>
  );
}

export default LandingPage;
