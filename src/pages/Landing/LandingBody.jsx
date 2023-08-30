import React, { useContext, useEffect, useState } from "react";

import "./LandingBody.css";
import RegSearchForm from "../Components/RegSearchForm/RegSearchForm";

function LandingBody() {


  return (
    <div className="landing-body-container">
      <div className="landing-form-container">
        <h2 className="landing-title">
          Complete Car History Check and ask{" "}
          <span className="gradient-text">ChatGPT</span> any Question.
        </h2>
        {/* <p className="landing-description">
                    Guiding your car-buying journey with deep data dives, insights and
                    comprehensive reports!
                </p> */}
        <hr className="landing-divider" />{" "}
        {/* This is the line you're adding */}
        <RegSearchForm />
      </div>
    </div>
  );
}

export default LandingBody;
