import { Combined, ExtraUrban, UrbanCold } from "./FuelConsumption";

export class Consumption {
  extraUrban: ExtraUrban | null;
  urbanCold: UrbanCold | null;
  combined: Combined | null;

  constructor(data: any) {
    this.extraUrban = data.ExtraUrban ? new ExtraUrban(data.ExtraUrban) : null;
    this.urbanCold = data.UrbanCold ? new UrbanCold(data.UrbanCold) : null;
    this.combined = data.Combined ? new Combined(data.Combined) : null;
  }
}
