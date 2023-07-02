import React from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import { FaRegEnvelope, FaDownload, FaShareSquare } from "react-icons/fa";
import Snackbar from "@mui/material/Snackbar";

import { CapitalizeEachWord } from "../../../auxiliaryFunctions/stringFunctions";
import "../OrderDetails.css";
import { getReportUrl } from "../../../hooks/reportHooks";

const VehicleMain = ({
  basic,
  free,
  orderId,
  auth,
  handleDownloadReport,
  handleEmailReport,
  emailStatus,
  snackbarOpen,
  handleSnackbarClose,
  showNewOrder,
  setShowNewOrder,
}) => {
  const navigate = useNavigate();

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        console.log("share");
        await getReportUrl(orderId, free, auth)
          .then((url) => url)
          .then(async (url) => {
            await navigator.share({
              url: url,
            });
          });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  const newOrderContainer = {
    float: "right",
  };

  return (
    <section className="section">
      <div className="section-title">
        {basic.VehicleRegistration.MakeModel && (
          <div>{CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}</div>
        )}
      </div>
      <div className="section-divider"></div>
      <div className="section-content">
        {free.RegistrationNumber && (
          <div className="registration-number-container">
            <div className="registration-number-gb">GB</div>
            <div className="registration-number-content">
              {free.RegistrationNumber}
            </div>
          </div>
        )}
        <div style={newOrderContainer}>
          <IconButton
            onClick={() => setShowNewOrder((prevState) => !prevState)}
            color="primary"
            aria-label="toggle new order"
          >
            {showNewOrder ? <RemoveIcon /> : <AddIcon />}
          </IconButton>
        </div>
        <div className="buttons-container">
          <button onClick={handleDownloadReport} className="button">
            <FaDownload />
          </button>
          <button onClick={handleEmailReport} className="button">
            <FaRegEnvelope />
          </button>
          {isMobile && (
            <button onClick={handleShare} className="button">
              <FaShareSquare />
            </button>
          )}
          <button onClick={() => navigate("/contact-us")} className="button">
            Contact Us
          </button>
        </div>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          message={emailStatus?.message}
        />
      </div>
    </section>
  );
};

export default VehicleMain;
