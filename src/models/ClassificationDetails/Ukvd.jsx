import { VrmFormat } from "./VrmFormat";

export class Ukvd {
  isElectricVehicle;
  vrmFormat;

  constructor(data) {
    this.isElectricVehicle = data.IsElectricVehicle;
    this.vrmFormat = data.VrmFormat ? new VrmFormat(data.VrmFormat) : null;
  }
}
