import React from "react";

import { CapitalizeEachWord } from "../../../auxiliaryFunctions/stringFunctions";

import { AiOutlineCar } from "react-icons/ai";
import RegistrationNumber from "../../../SVGs/RegistrationNumber";
import "../OrderDetails.css";

const VehicleMain = ({ basic, free }) => {
  return (
    <section className="section">
      <div style={style.vehicleModelContainer}>
        <div>
          <AiOutlineCar size={"2rem"} color={"#59396d"} />
        </div>
        <div style={style.title}>
          {basic.VehicleRegistration.MakeModel && (
            <div>{CapitalizeEachWord(basic.VehicleRegistration.MakeModel)}</div>
          )}
        </div>
      </div>
      <div style={style.vehicleRegistrationContainer}>
        <div>
          <RegistrationNumber />
        </div>
        <span style={style.gb}>GB</span>{" "}
        <span style={style.registrationNumber}>{free.RegistrationNumber}</span>
      </div>
    </section>
  );
};

const style = {
  vehicleModelContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#59396d",
    paddingLeft: "1rem",
  },
  vehicleRegistrationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
  },
  gb: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#59396d",
    paddingLeft: "1rem",
  },
  registrationNumber: {
    fontSize: "1.5rem",
    color: "#59396d",
    paddingLeft: "0.5rem",
  },
};

export default VehicleMain;
