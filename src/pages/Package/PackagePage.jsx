import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Snackbar } from "@mui/material";
import { AppContext } from "../../appContext";
import "./PackagePage.css";
import PackagePageLeft from "./PackagePageLeft";
import PackagePageRight from "./PackagePageRight";
import LandingHeader from "../NavMenus/LandingHeader";
import LandingFooter from "../NavMenus/LandingFooter";

const auth = getAuth();

const PackagePage = () => {
  const { vehicleFreeData, setPreviousPage } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [user, loading] = useAuthState(auth);

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
      <Helmet>
        <title>AutoDaddy | Full Car History Report</title>
        <meta
          name="description"
          content="AutoDaddy's Full Car History Report: Get comprehensive details about any vehicle and consult ChatGPT for insights and queries."
        />
        <meta
          name="keywords"
          content="auto, vehicle, car, history, report, autodaddy, ChatGPT, details, insights"
        />
        <link rel="canonical" href="https://autodaddy.co.uk/package" />
      </Helmet>
      <div className="Package-header-container">
        <div className="Package-header-main">
          <LandingHeader />
        </div>
      </div>
      <div className="package-container">
        <PackagePageLeft />
        <PackagePageRight />
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          key={"top-center"}
        />
      </div>
      
      {/*   <Chat /> */}
    </>
  );
};

export default PackagePage;
