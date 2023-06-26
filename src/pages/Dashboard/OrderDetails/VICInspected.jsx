import React from "react";
import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const VICInspected = ({ full, aiContent }) => {
  if (!full.VicTested) {
    return (
      <section className="section">
        <div className="section-title">VIC Inspected</div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section-title">VIC Inspected</div>
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
                <td className="section-table-second-column">Date</td>
                <td>{FormatDate(full.VicTestDate)}</td>
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
                <td className="section-table-second-column">Test Result</td>
                <td>{full.VicTestResult}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default VICInspected;
