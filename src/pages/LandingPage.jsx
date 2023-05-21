import React from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appContext";
import { VehicleFreeData } from "../models/VehicleFreeData";
import { useTheme } from "@mui/material/styles";

function LandingPage() {
  const [appData, setAppData] = useContext(AppContext);
  const { vehicleFreeData } = appData;
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
          `${process.env.REACT_APP_API_URL_DEV}/vehicledata/free/${registrationNumber}`
        )
        .then((res) => {
          const vehicleFreeData = new VehicleFreeData(res.data);
          setAppData((prevData) => ({
            ...prevData,
            vehicleFreeData,
          }));
          setResponseStatus(true);
        });
    } catch (error) {
      console.log(error);
      setResponseStatus(false);
    }
  };

  useEffect(() => {
    if (isValid && isSubmitted && responseStatus) {
      navigate("/tiers", { state: { vehicleFreeData } });
    }
  }, [isValid, isSubmitted, responseStatus, navigate, vehicleFreeData]);

  return (
    <Box pt={theme.spacing(20)}>
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center" }}>Search for a car history</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  border: "1px solid #bdbdbd",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "4px",
                  borderTopRightRadius: "0",
                  borderBottomRightRadius: "0",
                }}
              >
                <span style={{ fontWeight: "bold" }}>GB</span>
              </div>
            </Grid>
            <Grid item xs style={{ paddingLeft: "0" }}>
              <TextField
                fullWidth
                id="outlined-basic"
                label="Enter License Plate Number"
                variant="outlined"
                value={registrationNumber}
                onChange={(event) => setRegistrationNumber(event.target.value)}
                InputProps={{
                  style: {
                    height: "50px",
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "0",
                  },
                }}
              />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                  height: "50px",
                  backgroundColor: "#E8F653",
                  color: "black",
                  boxShadow: "none",
                }}
              >
                Go
              </Button>
            </Grid>
          </Grid>
          {isSubmitted && !isValid && <p>Invalid UK license plate number</p>}
        </form>
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/LandingPageImage.png`}
        alt="Landing page illustration"
        style={{ width: "100%" }}
      />
    </Box>
  );
}

export default LandingPage;
