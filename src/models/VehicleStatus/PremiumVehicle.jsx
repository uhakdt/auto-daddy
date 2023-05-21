import { YearTwoToSix } from "./YearTwoToSix";

export class PremiumVehicle {
  yearTwoToSix;

  constructor(data) {
    this.yearTwoToSix = data.YearTwoToSix
      ? new YearTwoToSix(data.YearTwoToSix)
      : null;
  }
}
