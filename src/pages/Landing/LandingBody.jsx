import React from "react";

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
        <hr className="landing-divider" />
        <RegSearchForm />
      </div>
    </div>
  );
}

export default LandingBody;
