import React from "react";
import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const ImportantChecks = ({ basic, aiContent }) => {
  return (
    <section className="section">
      <div className="section-title">
        Important Checks <br />
        <div className="section-title-sub">
          It is important to check the following details before purchasing to
          confirm the vehicle's identity.
        </div>
      </div>
      <div className="section-divider"></div>
      <div className="section-content">
        {aiContent ? (
          <div className="ai-summary-container">
            <div className="ai-summary-content">{aiContent}</div>
            <div className="ai-summary-by">Powered By ChadGPT</div>
          </div>
        ) : null}
        <div className="table-figure-container">
          <table rules="all" className="section-table">
            <tbody>
              <tr>
                <td className="section-table-first-column">
                  <div
                    className="section-table-row-status"
                    style={{
                      backgroundColor: "rgb(225, 249, 9)",
                      borderColor: "rgb(121, 130, 45)",
                    }}
                  ></div>
                </td>
                <td className="section-table-second-column">
                  VIN Last 5 Digits
                </td>
                <td>{basic.VinLastFiveDigits}</td>
              </tr>
              <tr>
                <td className="section-table-first-column">
                  <div
                    className="section-table-row-status"
                    style={{
                      backgroundColor: "rgb(225, 249, 9)",
                      borderColor: "rgb(121, 130, 45)",
                    }}
                  ></div>
                </td>
                <td className="section-table-second-column">Engine Number</td>
                <td>{basic.EngineNumber}</td>
              </tr>
              <tr>
                <td className="section-table-first-column">
                  <div
                    className="section-table-row-status"
                    style={{
                      backgroundColor: "rgb(225, 249, 9)",
                      borderColor: "rgb(121, 130, 45)",
                    }}
                  ></div>
                </td>
                <td className="section-table-second-column">V5C Issue Date</td>
                <td>{FormatDate(basic.V5CIssueDate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ImportantChecks;
