import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import { Snackbar } from "@mui/material";

import { AppContext } from "../../appContext";
import { VehicleFreeData } from "../../models/VehicleFreeData";
import CarLoader from "../../SVGs/CarLoader";
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
      setIsLoading(true);
      try {
        await axios
          .post(
            `${process.env.REACT_APP_API_URL}/vehicledata/free/${registrationNumber}`
          )
          .then((res) => {
            const vehicleFreeData = new VehicleFreeData(res.data);
            setVehicleFreeData(vehicleFreeData);
            setResponseStatus(true);
            setIsLoading(false);
          });
      } catch (error) {
        console.log(error);
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
      setPreviousPage("/packages");
      navigate("/packages", { state: { vehicleFreeData } });
    } else {
      setPreviousPage("/");
    }
  }, [isValid, isSubmitted, responseStatus, navigate, vehicleFreeData]);

  if (isLoading) {
    return (
      <div className="landing-loader">
        <CarLoader />
      </div>
    );
  }

  return (
    <div className="landing-container">
      <div className="landing-left">
        <h2 className="landing-logo">AutoDaddy</h2>
        <div className="landing-form-container">
          <h2 className="landing-title">
            Your AI Copilot in car buying decisions
          </h2>
          <p className="landing-description">
            Guiding your car-buying journey with deep data dives, insights and
            comprehensive reports!
          </p>

          <form className="landing-form" onSubmit={handleSubmit}>
            <div className="landing-GB">
              <span>GB</span>
            </div>
            <input
              type="text"
              className="landing-input"
              placeholder="License Plate"
              value={registrationNumber}
              onChange={(event) => setRegistrationNumber(event.target.value)}
            />
            <button type="submit" className="landing-button-go">
              Go
            </button>
          </form>
        </div>
        <div className="landing-footer-container">
          <div className="landing-logos">
            {/* TODO: Logos would be here... */}
          </div>
          <p className="landing-footer">
            <Link to="/privacy">Privacy</Link> |
            <Link to="/terms">Terms and Conditions</Link> |
            <Link to="/cookies">Cookies</Link> |<Link to="/gdpr">GDPR</Link> |
            <Link to="/contactus">Contact Us</Link>
          </p>
          <p className="landing-copyright">© 2023 AutoDaddy</p>
        </div>
      </div>

      <div className="landing-right">
        <div className="landing-button-login-container">
          <button className="landing-button-login">Login</button>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </div>
  );
}

export default LandingPage;
