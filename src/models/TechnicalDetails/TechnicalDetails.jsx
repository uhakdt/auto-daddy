import { Consumption } from "./Consumption/Consumption";
import { Dimensions } from "./Dimensions";
import { General } from "./General/General";
import { Performance } from "./Performance/Performance";
import { Safety } from "./Safety";

export class TechnicalDetails {
  dimensions;
  safety;
  general;
  Performance;
  consumption;

  constructor(data) {
    this.dimensions = new Dimensions(data.Dimensions);
    this.safety = data.Safety ? new Safety(data.Safety) : null;
    this.general = data.General ? new General(data.General) : null;
    this.performance = data.Performance
      ? new Performance(data.Performance)
      : null;
    this.consumption = data.Consumption
      ? new Consumption(data.Consumption)
      : null;
  }
}
