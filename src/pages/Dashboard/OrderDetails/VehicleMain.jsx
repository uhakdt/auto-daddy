import React from "react";

import { CapitalizeEachWord } from "../../../auxiliaryFunctions/stringFunctions";

import "../OrderDetails.css";

const VehicleMain = ({ free, basic, imageUrl }) => {
  return (
    <section>
      <div style={style.titleContainer}>
        <h1 style={style.title}>AutoDaddy Report</h1>
        <hr style={style.line} />
        <h2 style={style.subTitle}>
          <div>{CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}</div>
        </h2>
      </div>
      <div style={style.imageContainer}>
        {imageUrl ? <img width={"75%"} src={imageUrl} alt="Car" /> : null}
      </div>
    </section>
  );
};

const style = {
  titleContainer: {
    marginBottom: "1rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  line: {
    border: "0",
    height: "1px",
    background: "#333",
    backgroundImage: "linear-gradient(to right, white, #E0DFDF, white)",
  },
  subTitle: {
    fontSize: "3rem",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
};

export default VehicleMain;
