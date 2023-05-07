import { ElectricVehicleBattery } from "./ElectricalVehicleBattery";
import { Engine } from "./Engine";

export class General {
  engine: Engine | null;
  powerDelivery: string | null;
  typeApprovalCategory: string | null;
  electricVehicleBattery: ElectricVehicleBattery | null;
  seriesDescription: string | null;
  driverPosition: string | null;
  drivingAxle: string | null;
  dataVersionNumber: object | null;
  euroStatus: string | null;
  isLimitedEdition: boolean;

  constructor(data: any) {
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
