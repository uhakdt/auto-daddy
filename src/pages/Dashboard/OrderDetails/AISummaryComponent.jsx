import React from "react";
import "./AISummaryComponent.css";

const AISummaryComponent = ({ aiContentLoading, aiContent }) => {
  return (
    <div className="ai-summary-container">
      <div className="ai-summary-content">
        {aiContentLoading ? (
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          aiContent && (
            <>
              <span
                style={{
                  fontWeight: "bolder",
                  fontSize: "1.2rem",
                  marginRight: "1rem",
                }}
              >
                Rating: {aiContent?.["rating"]}
              </span>{" "}
              {aiContent?.["estimated_valuation"] === undefined ? (
                <></>
              ) : (
                <span style={{ fontWeight: "bolder", fontSize: "1.2rem" }}>
                  Valuation: £{aiContent["estimated_valuation"]}
                </span>
              )}
              <br />
              <br />
              {aiContent?.["content"]}
            </>
          )
        )}
      </div>
      <div className="ai-summary-by">Powered By ChatGPT</div>
    </div>
  );
};

export default AISummaryComponent;
