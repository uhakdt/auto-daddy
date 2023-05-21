import { ElectricVehicleBattery } from "./ElectricalVehicleBattery";
import { Engine } from "./Engine";

export class General {
  engine;
  powerDelivery;
  typeApprovalCategory;
  electricVehicleBattery;
  seriesDescription;
  driverPosition;
  drivingAxle;
  dataVersionNumber;
  euroStatus;
  isLimitedEdition;

  constructor(data) {
    this.engine = data.Engine ? new Engine(data.Engine) : null;
    this.powerDelivery = data.PowerDelivery;
    this.typeApprovalCategory = data.TypeApprovalCategory;
    this.electricVehicleBattery = data.ElectricVehicleBattery
      ? new ElectricVehicleBattery(data.ElectricVehicleBattery)
      : null;
    this.seriesDescription = data.SeriesDescription;
    this.driverPosition = data.DriverPosition;
    this.drivingAxle = data.DrivingAxle;
    this.dataVersionNumber = data.DataVersionNumber;
    this.euroStatus = data.EuroStatus;
    this.isLimitedEdition = data.IsLimitedEdition;
  }
}
