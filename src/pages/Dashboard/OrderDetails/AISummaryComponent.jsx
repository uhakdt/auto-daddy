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
              <div
                style={{
                  fontWeight: "bolder",
                  fontSize: "1.5rem",
                  marginRight: "1rem",
                }}
              >
                ChatGPT Rating: {aiContent?.["rating"]}
              </div>{" "}
              {aiContent?.["estimated_valuation"] === undefined ? (
                <></>
              ) : (
                <div
                  style={{
                    fontWeight: "bolder",
                    fontSize: "1.5rem",
                    marginTop: "0.5rem",
                  }}
                >
                  Valuation: {aiContent["estimated_valuation"]}{" "}
                  <span style={{ fontSize: "1rem" }}>
                    (Conservative Estimate of retail value)
                  </span>
                </div>
              )}
              <br />
              <div style={{ fontSize: "1.4rem", paddingTop: "1rem" }}>
                {aiContent?.["content"]}
              </div>
            </>
          )
        )}
      </div>
      <div className="ai-summary-by">Powered By ChatGPT</div>
    </div>
  );
};

export default AISummaryComponent;
