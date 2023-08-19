import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import {
  CalculateMOTPassRate,
  CalculateMOTFailedTests,
  CalculateTotalAdviceItems,
  CalculateTotalAdviceItemsFailed,
} from "../../../auxiliaryFunctions/orderFunctions";
import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const MOT = ({
  free,
  basic,
  aiContent,
  goToMOTSection,
  aiContentLoading,
  condition,
}) => {
  if (basic?.MotHistory?.RecordList?.length === 0) {
    return (
      <section ref={goToMOTSection} className="section">
        <div className="section-title">MOT</div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  return (
    <section ref={goToMOTSection} className="section">
      <div className="section-title">
        <div>MOT</div>
        <div>
          <img
            alt="Google"
            src={iconsUrl + (condition ? "check.svg" : "close.svg")}
            height={20}
          />
        </div>
      </div>
      <div className="section-divider"></div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />

        <div className="table-figure-container">
          <div className="section-table">
            <TableRow
              title="Pass Rate"
              item={basic?.MotHistory?.RecordList?.length}
              colour="#6f508c"
              last={false}
            >
              {basic?.MotHistory?.RecordList?.length
                ? CalculateMOTPassRate(basic.MotHistory.RecordList)
                : "No MOT History"}
            </TableRow>
            <TableRow
              title="Failed Tests"
              item={basic?.MotHistory?.RecordList}
              colour="#6f508c"
              last={false}
            >
              {CalculateMOTFailedTests(basic?.MotHistory?.RecordList || [])}
            </TableRow>
            <TableRow
              title="Total Advice Items"
              item={basic?.MotHistory?.RecordList}
              colour="#6f508c"
              last={false}
            >
              {CalculateTotalAdviceItems(basic?.MotHistory?.RecordList || [])}
            </TableRow>
            <TableRow
              title="Total Items Failed"
              item={basic?.MotHistory?.RecordList}
              colour="#6f508c"
              last={false}
            >
              {CalculateTotalAdviceItemsFailed(
                basic?.MotHistory?.RecordList || []
              )}
            </TableRow>
            <TableRow
              title="Expiry Date"
              item={free?.MotExpiryDate}
              colour="#6f508c"
              last={true}
            >
              {FormatDate(free?.MotExpiryDate)}
            </TableRow>
          </div>
        </div>

        {basic?.MotHistory?.RecordList?.map((x, i) => (
          <div className="table-figure-container" key={i}>
            <div className="section-table" style={{ width: "100%" }}>
              <TableRow
                item={x?.TestDate}
                title={`Test Nr. ${i + 1}`}
                colour="#6f508c"
                last={false}
              >
                {FormatDate(x?.TestDate)}
              </TableRow>
              <TableRow
                item={x?.TestNumber}
                title="Test Number"
                colour="#6f508c"
                last={false}
              >
                {x?.TestNumber}
              </TableRow>
              <TableRow
                item={x?.TestResult}
                title="Test Result"
                colour="#6f508c"
                last={false}
              >
                {x?.TestResult}
              </TableRow>
              <TableRow
                item={x?.ExpiryDate}
                title="Expiry Date"
                colour="#6f508c"
                last={false}
              >
                {FormatDate(x?.ExpiryDate)}
              </TableRow>
              {x?.AnnotationDetailsList?.map((y, j) => (
                <TableRow
                  key={j}
                  item={y?.Type}
                  title="MOT Advise"
                  colour="#6f508c"
                  last={j === x?.AnnotationDetailsList?.length - 1}
                >
                  Type: {y?.Type} <br /> {y?.Text}
                </TableRow>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MOT;
