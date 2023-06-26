import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { CapitalizeEachWord } from "../../../auxiliaryFunctions/stringFunctions";
import "../OrderDetails.css";

const VehicleMain = ({
  basic,
  free,
  handleDownloadReport,
  handleEmailReport,
  emailStatus,
  snackbarOpen,
  handleSnackbarClose,
}) => {
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
        <button className="button" onClick={handleDownloadReport}>
          Download Report
        </button>
        <button className="button" onClick={handleEmailReport}>
          Email Report
        </button>
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
