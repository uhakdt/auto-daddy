import React from "react";
import TableRow from "../../Package/VehicleData/TableRow";
import EmissionsLabel from "../../../SVGs/EmissionsLabel";
import AISummaryComponent from "./AISummaryComponent";

const EnergyConsumption = ({ basic, aiContent, aiContentLoading }) => {
  return (
    <section className="section">
      <div className="section-title">Energy & Consumption</div>
      <div className="section-divider"></div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />

        <div className="table-figure-container">
          <div className="section-table">
            <TableRow
              item={basic.TechnicalDetails.Performance.Power.Bhp}
              title="Power"
              colour="#6f508c"
              last={false}
            >
              {basic.TechnicalDetails.Performance.Power.Bhp} BHP
              {" / "}
              {basic.TechnicalDetails.Performance.Power.Kw} KW
              {" / "}
              {basic.TechnicalDetails.Performance.Power.Rpm} RPM
            </TableRow>
            <TableRow
              item={basic.TechnicalDetails.Performance.Torque.Nm}
              title="Torque"
              colour="#6f508c"
              last={false}
            >
              {basic.TechnicalDetails.Performance.Torque.Nm} Nm at
              {basic.TechnicalDetails.Performance.Torque.Rpm} RPM
            </TableRow>
            <TableRow
              item={basic.TechnicalDetails.General.Engine.NumberOfCylinders}
              title="Cylinders"
              colour="#6f508c"
              last={false}
            >
              {basic.TechnicalDetails.General.Engine.NumberOfCylinders}
            </TableRow>
            <TableRow
              item={basic.TechnicalDetails.Consumption.UrbanCold.Mpg}
              title="Urban"
              colour="#6f508c"
              last={false}
            >
              {basic.TechnicalDetails.Consumption.UrbanCold.Mpg} Mpg
            </TableRow>
            <TableRow
              item={basic.TechnicalDetails.Consumption.ExtraUrban.Mpg}
              title="Extra Urban"
              colour="#6f508c"
              last={false}
            >
              {basic.TechnicalDetails.Consumption.ExtraUrban.Mpg} Mpg
            </TableRow>
            <TableRow
              item={basic.TechnicalDetails.Consumption.Combined.Mpg}
              title="Combined"
              colour="#6f508c"
              last={false}
            >
              {basic.TechnicalDetails.Consumption.Combined.Mpg} Mpg
            </TableRow>
            <TableRow
              item={basic.TechnicalDetails.Performance.Co2}
              title="CO2 Emissions"
              colour="#6f508c"
              last={true}
            >
              {basic.TechnicalDetails.Performance.Co2} g/Km
            </TableRow>
          </div>

          {/* <EmissionsLabel emission={basic.TechnicalDetails.Performance.Co2} /> */}
        </div>
      </div>
      <div>
        {/* TODO: Calculate Tax for 12 months */}
        {/* TODO: Calculate Tax for 6 months */}
        {/* TODO: Calculate Fuel Cost for 12,000 miles */}
      </div>
    </section>
  );
};

export default EnergyConsumption;
