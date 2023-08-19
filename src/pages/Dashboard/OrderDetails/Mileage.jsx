import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import AISummaryComponent from "./AISummaryComponent";

import TableRow from "../../Package/VehicleData/TableRow";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";
import {
  CalcAvgMileAYear,
  CalcLastYearMile,
} from "../../../auxiliaryFunctions/orderFunctions";
import { CapitalizeEachWord } from "../../../auxiliaryFunctions/stringFunctions";

const Mileage = ({
  full,
  aiContent,
  goToMileageSection,
  aiContentLoading,
  condition,
}) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const chartWidth = dimensions.width > 500 ? 500 : dimensions.width * 0.6;
  const chartHeight = dimensions.width > 500 ? 300 : dimensions.width * 0.6;

  const data =
    full?.MileageRecordList?.map((record) => ({
      date: record.DateOfInformation,
      mileage: record.Mileage,
    })).reverse() || [];

  const sortedMileageRecords =
    full?.MileageRecordList?.slice().sort((a, b) => {
      const dateA = new Date(a.DateOfInformation);
      const dateB = new Date(b.DateOfInformation);
      return dateB - dateA;
    }) || [];

  return (
    <section ref={goToMileageSection} className="section">
      <div className="section-title">
        <div>Mileage</div>
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
              item={"Odometer"}
              title="Odometer"
              colour="#6f508c"
              last={false}
            >
              In miles
            </TableRow>
            <TableRow
              item={full?.MileageRecordCount}
              title="No. of Registrations"
              colour="#6f508c"
              last={false}
            >
              {full?.MileageRecordCount || "Unknown"}
            </TableRow>
            <TableRow
              item={full?.MileageAnomalyDetected}
              title="Anomaly"
              colour="#6f508c"
              last={false}
            >
              {CapitalizeEachWord(
                (full?.MileageAnomalyDetected || "").toString()
              )}
            </TableRow>
            {full?.MileageRecordList?.length > 0 && (
              <>
                <TableRow
                  item={sortedMileageRecords[0]?.DateOfInformation}
                  title="Last Registration"
                  colour="#6f508c"
                  last={false}
                >
                  {sortedMileageRecords[0]?.DateOfInformation || "Unknown"}
                </TableRow>
                <TableRow
                  item={sortedMileageRecords[0]?.Mileage}
                  title="Last MOT Mileage"
                  colour="#6f508c"
                  last={false}
                >
                  {sortedMileageRecords[0]?.Mileage || "Unknown"}
                </TableRow>
                <TableRow
                  item={CalcAvgMileAYear(sortedMileageRecords)}
                  title="Average Mileage"
                  colour="#6f508c"
                  last={false}
                >
                  {`${
                    CalcAvgMileAYear(sortedMileageRecords) || "Unknown"
                  } p/year`}
                </TableRow>
                <TableRow
                  item={CalcLastYearMile(sortedMileageRecords)}
                  title="Mileage Last Year"
                  colour="#6f508c"
                  last={true}
                >
                  {`${
                    CalcLastYearMile(sortedMileageRecords) || "Unknown"
                  } miles`}
                </TableRow>
              </>
            )}
          </div>
          {/* Be sure to handle potential undefined values in LineChart and data */}
          <LineChart
            width={chartWidth}
            height={chartHeight}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="mileage" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="mileage"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
        {sortedMileageRecords?.map((x, i) => {
          return (
            <div key={i} className="table-figure-container">
              <div className="section-table">
                <TableRow
                  item={x?.DateOfInformation}
                  title="Date of Information"
                  colour="#6f508c"
                  last={false}
                >
                  {FormatDate(x?.DateOfInformation || "Unknown")}
                </TableRow>
                <TableRow
                  item={x?.Mileage}
                  title="Mileage"
                  colour="#6f508c"
                  last={false}
                >
                  {x?.Mileage || "Unknown"}
                </TableRow>
                <TableRow
                  item={x?.SourceOfInformation}
                  title="Source of Information"
                  colour="#6f508c"
                  last={true}
                >
                  {x?.SourceOfInformation || "Unknown"}
                </TableRow>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Mileage;
