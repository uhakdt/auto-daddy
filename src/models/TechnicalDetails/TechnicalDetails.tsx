import { Dimensions } from "./Dimensions";
import { General } from "./General/General";
import { Performance } from "./Performance/Performance";
import { Consumption } from "./Consumption/Consumption";

export class TechnicalDetails {
  dimensions: Dimensions;
  general: General;
  performance: Performance;
  consumption: Consumption;

  constructor(data: any) {
    this.dimensions = new Dimensions(data.Dimensions);
    this.general = new General(data.General);
    this.performance = new Performance(data.Performance);
    this.consumption = new Consumption(data.Consumption);
  }
}
