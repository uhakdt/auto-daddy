import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import { CapitalizeEachWord } from "../../../auxiliaryFunctions/stringFunctions";
import "../OrderDetails.css";

const VehicleDetails = ({
  free,
  basic,
  aiContent,
  imageUrl,
  aiContentLoading,
}) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  return (
    <section className="section">
      <div className="section-title">
        <div>{CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}</div>
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
              item={basic?.VehicleRegistration?.MakeModel}
              title="Model"
              colour="#6f508c"
              last={false}
            >
              {CapitalizeEachWord(basic?.VehicleRegistration?.MakeModel)}
            </TableRow>
            <TableRow
              item={free?.FuelType}
              title="Fuel Type"
              colour="#6f508c"
              last={false}
            >
              {CapitalizeEachWord(free?.FuelType)}
            </TableRow>
            <TableRow
              item={free?.Colour}
              title="Colour"
              colour="#6f508c"
              last={false}
            >
              {CapitalizeEachWord(free?.Colour)}
            </TableRow>
            <TableRow
              item={free?.EngineCapacity}
              title="Engine"
              colour="#6f508c"
              last={false}
            >
              {free?.EngineCapacity} cc
            </TableRow>
            <TableRow
              item={
                basic?.SmmtDetails?.Transmission &&
                basic?.SmmtDetails?.NumberOfGears
              }
              title="Gearbox"
              colour="#6f508c"
              last={false}
            >
              {basic?.SmmtDetails?.NumberOfGears} speed{" "}
              {CapitalizeEachWord(basic?.SmmtDetails?.Transmission)}
            </TableRow>
            <TableRow
              item={
                basic?.TechnicalDetails?.Performance?.Acceleration?.ZeroTo60Mph
              }
              title="Acceleration"
              colour="#6f508c"
              last={false}
            >
              {basic?.TechnicalDetails?.Performance?.Acceleration?.ZeroTo60Mph}
            </TableRow>
            <TableRow
              item={basic?.TechnicalDetails?.Performance?.MaxSpeed?.Mph}
              title="Top Speed"
              colour="#6f508c"
              last={true}
            >
              {basic?.TechnicalDetails?.Performance?.MaxSpeed?.Mph} Mph
            </TableRow>
          </div>

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
