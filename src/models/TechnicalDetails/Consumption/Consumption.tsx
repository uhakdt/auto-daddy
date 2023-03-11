import { ExtraUrban, UrbanCold, Combined } from "./FuelConsumption";

export class Consumption {
  extraUrban: ExtraUrban;
  urbanCold: UrbanCold;
  combined: Combined;

  constructor(data: any) {
    this.extraUrban = new ExtraUrban(data.ExtraUrban);
    this.urbanCold = new UrbanCold(data.UrbanCold);
    this.combined = new Combined(data.Combined);
  }
}
