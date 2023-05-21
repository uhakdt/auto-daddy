import { Identification } from "./Identification";

export class UkvdEnhancedData {
  ElectricVehicleData;
  identification;

  constructor(data) {
    this.electricVehicleData = data.ElectricVehicleData;
    this.identification = new Identification(data.Identification);
  }
}
