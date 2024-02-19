import React from "react";

import TableRow from "../../Package/VehicleData/TableRow";
import AISummaryComponent from "./AISummaryComponent";

import "../OrderDetails.css";
import FormatDate from "../../../auxiliaryFunctions/dateFunctions";

const Salvage = ({ free, full, aiContent, aiContentLoading, condition }) => {
  const iconsUrl = process.env.PUBLIC_URL + "/icons/";

  return (
    <section className="section">
      <div className="section-title">
        <div>Salvage</div>
        <div>
          <img
            alt="Google"
            src={iconsUrl + (condition ? "check.svg" : "close.svg")}
            height={40}
          />
        </div>
      </div>
      <div className="section-divider"></div>
      <div className="section-content">
        <AISummaryComponent
          aiContentLoading={aiContentLoading}
          aiContent={aiContent}
        />
        <div className="section-column">
          <div className="section-info-column">
            {full?.Salvage?.salvage_auction_records?.map((record, index) => (
              <div key={record.salvage_auction_record_id}>
                <TableRow
                  item={record.salvage_auction_lot_desc}
                  title="Lot Desc"
                  colour="#6f508c"
                  last={false}
                >
                  {record.salvage_auction_lot_desc}
                </TableRow>
                <TableRow
                  item={record.salvage_auction_lot_date}
                  title="Lot Date"
                  colour="#6f508c"
                  last={false}
                >
                  {FormatDate(record.salvage_auction_lot_date)}
                </TableRow>
                <TableRow
                  item={record.mileage}
                  title="Mileage"
                  colour="#6f508c"
                  last={false}
                >
                  {record.mileage}
                </TableRow>
                <TableRow
                  item={record.primary_damage_desc}
                  title="Primary Damage"
                  colour="#6f508c"
                  last={false}
                >
                  {record.primary_damage_desc}
                </TableRow>
                <TableRow
                  item={record.secondary_damage_desc}
                  title="Secondady Damage"
                  colour="#6f508c"
                  last={false}
                >
                  {record.secondary_damage_desc}
                </TableRow>

                <div className="section-image-column">
                  {record.external_image_urls ? (
                    <div>
                      <img
                        width={"100%"}
                        src={record.external_image_urls}
                        alt="Car"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Salvage;
