import { VehicleBasicData } from "./VehicleBasicData";
import { VdiCheckFull } from "./VdiCheckFull/VdiCheckFull";

export class VehicleFullData {
  vehicleBasicData: VehicleBasicData | null;
  vdiCheckFull: VdiCheckFull | null;
  constructor(data: any) {
    this.vehicleBasicData = data.VehicleBasicData
      ? new VehicleBasicData(data.VehicleBasicData)
      : null;
    this.vdiCheckFull = data.VdiCheckFull
      ? new VdiCheckFull(data.VdiCheckFull)
      : null;
  }
}
