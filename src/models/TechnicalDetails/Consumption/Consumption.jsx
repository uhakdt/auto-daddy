import { Combined, ExtraUrban, UrbanCold } from "./FuelConsumption";

export class Consumption {
  extraUrban;
  urbanCold;
  combined;

  constructor(data) {
    this.extraUrban = data.ExtraUrban ? new ExtraUrban(data.ExtraUrban) : null;
    this.urbanCold = data.UrbanCold ? new UrbanCold(data.UrbanCold) : null;
    this.combined = data.Combined ? new Combined(data.Combined) : null;
  }
}
