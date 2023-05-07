import { YearTwoToSix } from "./YearTwoToSix";

export class PremiumVehicle {
  yearTwoToSix: YearTwoToSix | null;

  constructor(data: any) {
    this.yearTwoToSix = data.YearTwoToSix
      ? new YearTwoToSix(data.YearTwoToSix)
      : null;
  }
}
