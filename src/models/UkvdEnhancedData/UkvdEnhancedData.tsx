import { Identification } from "./Identification";

export class UkvdEnhancedData {
  electricVehicleData: object;
  identification: Identification;

  constructor(data: any) {
    this.electricVehicleData = data.ElectricVehicleData;
    this.identification = new Identification(data.Identification);
  }
}
