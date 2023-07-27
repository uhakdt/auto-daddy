import React from "react";

import "./AISummaryComponent.css";

const AISummaryComponent = ({ aiContentLoading, aiContent }) => {
  return aiContentLoading ? (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  ) : (
    aiContent && (
      <div className="ai-summary-container">
        <div className="ai-summary-content">{aiContent}</div>
        <div className="ai-summary-by">Powered By ChatGPT</div>
      </div>
    )
  );
};

export default AISummaryComponent;
