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

import TableRow from "../../Package/VehicleData/TableRow";

import FormatDate from "../../../auxiliaryFunctions/dateFunctions";
import {
  CalcAvgMileAYear,
  CalcLastYearMile,
} from "../../../auxiliaryFunctions/orderFunctions";
import { CapitalizeEachWord } from "../../../auxiliaryFunctions/stringFunctions";

const Mileage = ({ full, aiContent, goToMileageSection }) => {
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

  const data = full.MileageRecordList.map((record) => ({
    date: record.DateOfInformation,
    mileage: record.Mileage,
  })).reverse();

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
              item={full.MileageRecordCount}
              title="No. of Registrations"
              colour="#6f508c"
              last={false}
            >
              {full.MileageRecordCount}
            </TableRow>
            <TableRow
              item={full.MileageAnomalyDetected}
              title="Anomaly"
              colour="#6f508c"
              last={false}
            >
              {CapitalizeEachWord(full.MileageAnomalyDetected.toString())}
            </TableRow>
            {full.MileageRecordList.length > 0 && (
              <>
                <TableRow
                  item={
                    full.MileageRecordList[full.MileageRecordList.length - 1]
                  }
                  title="First Registration"
                  colour="#6f508c"
                  last={false}
                >
                  {
                    full.MileageRecordList[full.MileageRecordList.length - 1]
                      .DateOfInformation
                  }
                </TableRow>
                <TableRow
                  item={full.MileageRecordList[0]}
                  title="Last Registration"
                  colour="#6f508c"
                  last={false}
                >
                  {full.MileageRecordList[0].DateOfInformation}
                </TableRow>
                <TableRow
                  item={full.MileageRecordList[0]}
                  title="Last MOT Mileage"
                  colour="#6f508c"
                  last={false}
                >
                  {full.MileageRecordList[0].Mileage}
                </TableRow>
                <TableRow
                  item={CalcAvgMileAYear(full.MileageRecordList)}
                  title="Average Mileage"
                  colour="#6f508c"
                  last={false}
                >
                  {`${CalcAvgMileAYear(full.MileageRecordList)} p/year`}
                </TableRow>
                <TableRow
                  item={CalcLastYearMile(full.MileageRecordList)}
                  title="Mileage Last Year"
                  colour="#6f508c"
                  last={true}
                >
                  {`${CalcLastYearMile(full.MileageRecordList)} miles`}
                </TableRow>
              </>
            )}
          </div>
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
        {full.MileageRecordList.map((x, i) => {
          return (
            <div key={i} className="table-figure-container">
              <table rules="all" className="section-table">
                <tbody>
                  <TableRow
                    item={x.DateOfInformation}
                    title="Date of Information"
                    colour="#6f508c"
                    last={false}
                  >
                    {FormatDate(x.DateOfInformation)}
                  </TableRow>
                  <TableRow
                    item={x.Mileage}
                    title="Mileage"
                    colour="#6f508c"
                    last={false}
                  >
                    {x.Mileage}
                  </TableRow>
                  <TableRow
                    item={x.SourceOfInformation}
                    title="Source of Information"
                    colour="#6f508c"
                    last={true}
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
