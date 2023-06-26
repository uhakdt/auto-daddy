import React from "react";
import TableRow from "./TableRow";
import {
  CalculateMOTPassRate,
  CalculateMOTFailedTests,
  CalculateTotalAdviceItems,
  CalculateTotalAdviceItemsFailed,
} from "../../../auxiliaryFunctions/orderFunctions";
import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const MOT = ({ free, basic, aiContent, goToMOTSection }) => {
  if (basic.MotHistory.RecordList.length === 0) {
    return (
      <section ref={goToMOTSection} className="section">
        <div className="section-title">MOT</div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section ref={goToMOTSection} className="section">
      <div className="section-title">MOT</div>
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
              <TableRow
                item={basic.MotHistory.RecordList.length}
                title="Pass Rate"
              >
                {basic.MotHistory.RecordList.length ? (
                  <>{CalculateMOTPassRate(basic.MotHistory.RecordList)}</>
                ) : (
                  <>No MOT History</>
                )}
              </TableRow>
              <TableRow item={basic.MotHistory.RecordList} title="Failed Tests">
                {CalculateMOTFailedTests(basic.MotHistory.RecordList)}
              </TableRow>
              <TableRow
                item={basic.MotHistory.RecordList}
                title="Total Advice Items"
              >
                {CalculateTotalAdviceItems(basic.MotHistory.RecordList)}
              </TableRow>
              <TableRow
                item={basic.MotHistory.RecordList}
                title="Total Items Failed"
              >
                {CalculateTotalAdviceItemsFailed(basic.MotHistory.RecordList)}
              </TableRow>
              <TableRow item={free.MotExpiryDate} title="Expiry Date">
                {FormatDate(free.MotExpiryDate)}
              </TableRow>
            </tbody>
          </table>
        </div>

        {basic.MotHistory.RecordList.map((x, i) => (
          <div className="table-figure-container" key={i}>
            <table
              style={{ width: "100%" }}
              rules="all"
              className="section-table"
            >
              <tbody>
                <TableRow item={x.TestDate} title={`Test Nr. ${i + 1}`}>
                  {FormatDate(x.TestDate)}
                </TableRow>
                <TableRow item={x.TestNumber} title="Test Number">
                  {x.TestNumber}
                </TableRow>
                <TableRow item={x.TestResult} title="Test Result">
                  {x.TestResult}
                </TableRow>
                <TableRow item={x.ExpiryDate} title="Expiry Date">
                  {FormatDate(x.ExpiryDate)}
                </TableRow>
                {x.AnnotationDetailsList.map((y, j) => (
                  <TableRow key={j} item={y.Type} title="MOT Advise">
                    Type: {y.Type} <br /> {y.Text}
                  </TableRow>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MOT;
