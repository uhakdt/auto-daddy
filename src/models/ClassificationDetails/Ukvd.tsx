import { VrmFormat } from "./VrmFormat";

export class Ukvd {
  isElectricVehicle: boolean | null;
  vrmFormat: VrmFormat | null;

  constructor(data: any) {
    this.isElectricVehicle = data.IsElectricVehicle;
    this.vrmFormat = data.VrmFormat ? new VrmFormat(data.VrmFormat) : null;
  }
}
