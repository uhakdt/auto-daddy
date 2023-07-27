import React from "react";
import "../OrderDetails.css";

const AIMainSummary = ({ aiContent, aiContentLoading }) => {
  return (
    <section className="section">
      <div className="section-title">AutoDaddy AI Summary</div>
      <div className="section-content">
        {aiContentLoading ? (
          <div>Loading...</div> // replace this with your loading spinner
        ) : (
          aiContent && (
            <div className="ai-summary-container">
              <div className="ai-summary-content">{aiContent}</div>
              <div className="ai-summary-by">Powered By ChatGPT</div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default AIMainSummary;
