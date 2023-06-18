import React from "react";
import TableRow from "./TableRow";
import FormatDate from "../../auxiliaryFunctions/dateFunctions";
import {
  CalcAvgMileAYear,
  CalcLastYearMile,
} from "../../auxiliaryFunctions/mathFunctions";
import { CapitalizeEachWord } from "../../auxiliaryFunctions/stringFunctions";

const Mileage = ({ full, aiContent, goToMileageSection }) => {
  return (
    <section ref={goToMileageSection} className="section">
      <div className="section-title">Mileage</div>
      <div className="section-divider"></div>
      <div className="section-content">
        {aiContent && (
          <div className="ai-summary-container">
            <div className="ai-summary-content">{aiContent}</div>
            <div className="ai-summary-by">Powered By ChadGPT</div>
          </div>
        )}
        <div className="table-figure-container">
          <table rules="all" className="section-table">
            <tbody>
              <TableRow item={"Odometer"} title="Odometer">
                In miles
              </TableRow>
              <TableRow
                item={full.MileageRecordCount}
                title="No. of Registrations"
              >
                {full.MileageRecordCount}
              </TableRow>
              <TableRow item={full.MileageAnomalyDetected} title="Anomaly">
                {CapitalizeEachWord(full.MileageAnomalyDetected.toString())}
              </TableRow>
              {full.MileageRecordList.length > 0 && (
                <>
                  <TableRow
                    item={
                      full.MileageRecordList[full.MileageRecordList.length - 1]
                    }
                    title="First Registration"
                  >
                    {
                      full.MileageRecordList[full.MileageRecordList.length - 1]
                        .DateOfInformation
                    }
                  </TableRow>
                  <TableRow
                    item={full.MileageRecordList[0]}
                    title="Last Registration"
                  >
                    {full.MileageRecordList[0].DateOfInformation}
                  </TableRow>
                  <TableRow
                    item={full.MileageRecordList[0]}
                    title="Last MOT Mileage"
                  >
                    {full.MileageRecordList[0].Mileage}
                  </TableRow>
                  <TableRow
                    item={CalcAvgMileAYear(full.MileageRecordList)}
                    title="Average Mileage"
                  >
                    {`${CalcAvgMileAYear(full.MileageRecordList)} p/year`}
                  </TableRow>
                  <TableRow
                    item={CalcLastYearMile(full.MileageRecordList)}
                    title="Mileage Last Year"
                  >
                    {`${CalcLastYearMile(full.MileageRecordList)} miles`}
                  </TableRow>
                </>
              )}
            </tbody>
          </table>
        </div>
        {full.MileageRecordList.map((x, i) => {
          return (
            <div className="table-figure-container">
              <table
                style={{ width: "100%" }}
                rules="all"
                className="section-table"
              >
                <tbody>
                  <TableRow
                    item={x.DateOfInformation}
                    title="Date of Information"
                  >
                    {FormatDate(x.DateOfInformation)}
                  </TableRow>
                  <TableRow item={x.Mileage} title="Mileage">
                    {x.Mileage}
                  </TableRow>
                  <TableRow
                    item={x.SourceOfInformation}
                    title="Source of Information"
                  >
                    {x.SourceOfInformation}
                  </TableRow>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Mileage;
