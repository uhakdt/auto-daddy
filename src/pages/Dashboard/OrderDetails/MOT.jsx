import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";
import "./MOT.css";
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
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  if (basic?.MotHistory?.RecordList?.length === 0) {
    return (
      <section ref={goToMOTSection} className="section">
        <div className="section-title">
          <div>MOT</div>
          <div>
            <img
              alt="Google"
              src={iconsUrl + (condition ? "check.svg" : "close.svg")}
              height={40}
            />
          </div>
        </div>
        <div className="section-divider"></div>
        <div className="section-content">No Records - All Fine.</div>
      </section>
    );
  }

  return (
    <section ref={goToMOTSection} className="section">
      <div className="section-title">
        <div>MOT</div>
        <div>
          <img
            alt="Google"
            src={iconsUrl + (condition ? "check.svg" : "close.svg")}
            height={40}
          />
        </div>
      </div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />
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
          {CalculateTotalAdviceItemsFailed(basic?.MotHistory?.RecordList || [])}
        </TableRow>
        <TableRow
          title="Expiry Date"
          item={free?.MotExpiryDate}
          colour="#6f508c"
          last={true}
        >
          {FormatDate(free?.MotExpiryDate)}
        </TableRow>
        <ul className="sessions">
          {basic?.MotHistory?.RecordList?.map((x, i) => (
            <div key={i}>
              <li>
                <div className="mot-time">{FormatDate(x?.TestDate)}</div>
                {/* <p>{`Test Nr. ${i + 1}`}</p> */}
                {/* <p>Test Number</p>
                <div className="time">{x?.TestNumber}</div> */}
                <div>Test Result</div>
                <div className="mot-time">{x?.TestResult}</div>
                <div>Expiry Date</div>
                <div className="mot-time">{FormatDate(x?.ExpiryDate)}</div>
                {x?.AnnotationDetailsList?.map((y, j) => (
                  <div key={j}>
                    <div className="mot-time">{y?.Type}</div>
                    <div className="mot-title">MOT Advise: {y?.Text}</div>
                  </div>
                ))}
              </li>
              <li></li>
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default MOT;
