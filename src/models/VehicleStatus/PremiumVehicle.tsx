import { YearTwoToSix } from "./YearTwoToSix";

export class PremiumVehicle {
  yearTwoToSix: YearTwoToSix;

  constructor(data: any) {
    this.yearTwoToSix = new YearTwoToSix(data.YearTwoToSix);
  }
}
