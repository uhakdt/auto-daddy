import React from "react";
import "../OrderDetails.css";

const AIMainSummary = ({ aiContentList }) => {
  return (
    <section className="section">
      <div className="section-title">
        AutoDaddy <br />
        <span className="section-title-sub">AI Summary</span>
      </div>
      <div className="section-divider"></div>
      <div className="section-content">
        {aiContentList[0] && (
          <div className="ai-summary-container">
            <div className="ai-summary-content">{aiContentList[0]}</div>
            <div className="ai-summary-by">Powered By ChadGPT</div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIMainSummary;
