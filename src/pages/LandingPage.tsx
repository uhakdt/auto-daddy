import { Box, Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../appContext";
import { VehicleCheckData } from "../models/VehicleCheckData";
import { useTheme } from "@mui/material/styles";

function LandingPage() {
  const [appData, setAppData] = useContext(AppContext);
  const { tier, vehicleCheckData } = appData;
  const [pattern] = useState<RegExp>(/^[A-Z]{2}\d{2}\s?[A-Z]{3}$/i);
  const [licensePlate, setLicensePlate] = useState("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<boolean>(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    setIsValid(pattern.test(licensePlate));
    try {
      await axios
        .get(`http://localhost:4242/api/v1/vehicledata/check/${licensePlate}`)
        .then((res) => {
          const vehicleCheckData = new VehicleCheckData(
            res.data.VehicleCheckData
          );
          setAppData((prevData: any) => ({
            ...prevData,
            vehicleCheckData,
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
      navigate("/tiers", { state: { tier, vehicleCheckData } });
    }
  }, [isValid, isSubmitted, responseStatus, navigate, vehicleCheckData, tier]);

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
                value={licensePlate}
                onChange={(event) => setLicensePlate(event.target.value)}
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
