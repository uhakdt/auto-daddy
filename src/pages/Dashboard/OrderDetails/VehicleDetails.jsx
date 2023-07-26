import React from "react";
import TableRow from "./TableRow";
import { CapitalizeEachWord } from "../../../auxiliaryFunctions/stringFunctions";
import "../OrderDetails.css";

const VehicleDetails = ({ free, basic, aiContent, imageUrl }) => {
  return (
    <section className="section">
      <div className="section-title">
        {CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}
        <br />
        <span className="section-title-sub">Details</span>
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
              <TableRow
                item={basic.VehicleRegistration.MakeModel}
                title="Model"
              >
                {CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}
              </TableRow>
              <TableRow item={free.FuelType} title="Fuel Type">
                {CapitalizeEachWord(free.FuelType)}
              </TableRow>
              <TableRow item={free.Colour} title="Colour">
                {CapitalizeEachWord(free.Colour)}
              </TableRow>
              <TableRow item={free.EngineCapacity} title="Engine">
                {free.EngineCapacity} cc
              </TableRow>
              <TableRow
                item={
                  basic.SmmtDetails.Transmission &&
                  basic.SmmtDetails.NumberOfGears
                }
                title="Gearbox"
              >
                {basic.SmmtDetails.NumberOfGears} speed{" "}
                {CapitalizeEachWord(basic.SmmtDetails.Transmission)}
              </TableRow>
              <TableRow
                item={
                  basic.TechnicalDetails.Performance.Acceleration?.ZeroTo60Mph
                }
                title="Acceleration"
              >
                {basic.TechnicalDetails.Performance.Acceleration?.ZeroTo60Mph}
              </TableRow>
              <TableRow
                item={basic.TechnicalDetails.Performance.MaxSpeed.Mph}
                title="Top Speed"
              >
                {basic.TechnicalDetails.Performance.MaxSpeed.Mph} Mph
              </TableRow>
            </tbody>
          </table>
          {imageUrl ? (
            <div>
              <img width={"100%"} src={imageUrl} alt="Car" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default VehicleDetails;
