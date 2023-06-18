import React from "react";
import FormatDate from "../../auxiliaryFunctions/dateFunctions";

const WriteOff = ({ full, aiContent, goToWriteOffSection }) => {
  if (!full.WrittenOff && full.WriteOffRecordCount === 0) {
    return (
      <section ref={goToWriteOffSection} className="section">
        <div className="section-title">Write Off</div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section ref={goToWriteOffSection} className="section">
      <div className="section-title">Write Off</div>
      <div className="section-divider"></div>
      <div className="section-content">
        {aiContent ? (
          <div className="ai-summary-container">
            <div className="ai-summary-content">{aiContent}</div>
            <div className="ai-summary-by">Powered By ChadGPT</div>
          </div>
        ) : (
          <></>
        )}
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
                <td>{FormatDate(full.WriteOffDate)}</td>
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
                <td className="section-table-second-column">Category</td>
                <td>{full.WriteOffCategory}</td>
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
                <td className="section-table-second-column">Record Count</td>
                <td>{full.WriteOffRecordCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {full.WriteOffRecordList > 0 ? (
          <>
            {full.WriteOffRecordList.map((x, i) => {
              return (
                <div className="table-figure-container">
                  <table
                    style={{ width: "100%" }}
                    rules="all"
                    className="section-table"
                  >
                    <tbody>{/* TODO: Needs to be checked and added */}</tbody>
                  </table>
                </div>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
};

export default WriteOff;
