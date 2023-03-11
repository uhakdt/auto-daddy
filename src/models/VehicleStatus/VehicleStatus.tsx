import { MotVed } from "./MotVed";

export class VehicleStatus {
  motVed: MotVed;

  constructor(data: any) {
    this.motVed = new MotVed(data.MotVed);
  }
}
