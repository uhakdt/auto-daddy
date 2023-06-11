import React from "react";
import { Box, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appContext";
import { VehicleFreeData } from "../models/VehicleFreeData";
import CarLoader from "../components/SVGs/CarLoader";
import { useTheme } from "@mui/material/styles";
import { Snackbar } from "@mui/material"; // import Snackbar
import "./LandingPage.css";

function LandingPage() {
  const { vehicleFreeData, setVehicleFreeData, setPreviousPage } =
    useContext(AppContext);
  const [pattern] = useState(/^[A-Z]{2}\d{2}\s?[A-Z]{3}$/i);
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();

  const [snackbarOpen, setSnackbarOpen] = useState(false); // Snackbar open state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Snackbar message state

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (pattern.test(registrationNumber)) {
      setIsValid(true);
      setIsLoading(true); // Set loading state to true on form submit
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/vehicledata/free/${registrationNumber}`
          )
          .then((res) => {
            const vehicleFreeData = new VehicleFreeData(res.data);
            setVehicleFreeData(vehicleFreeData);
            setResponseStatus(true);
            setIsLoading(false); // Set loading state to false after data fetch
          });
      } catch (error) {
        console.log(error);
        setSnackbarMessage(error.response.data.message); // Set error message state
        setSnackbarOpen(true); // Open the Snackbar
        setResponseStatus(false);
        setIsLoading(false); // Set loading state to false in case of error
      }
    } else {
      setIsValid(false);
      setSnackbarMessage("Invalid UK license plate number"); // Set error message state
      setSnackbarOpen(true); // Open the Snackbar
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

  // Add a loading state render
  if (isLoading) {
    return (
      <div className="loader">
        <CarLoader />
      </div>
    );
  }

  return (
    <>
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
                  onChange={(event) =>
                    setRegistrationNumber(event.target.value)
                  }
                  InputProps={{
                    className: "landing__text__input",
                  }}
                />
              </Grid>
              <Grid item>
                <button type="submit" className="button-go">
                  Go
                </button>
              </Grid>
            </Grid>
          </form>
        </div>
        <img
          className="landing__image"
          src={`${process.env.PUBLIC_URL}/landing-page-image.png`}
          alt="Landing page illustration"
        />
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
}

export default LandingPage;
