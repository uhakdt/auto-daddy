import { FirstYear } from "./FirstYear";
import { PremiumVehicle } from "./PremiumVehicle";
import { Standard } from "./Standard";

export class VedRate {
  firstYear: FirstYear;
  premiumVehicle: PremiumVehicle;
  standard: Standard;

  constructor(data: any) {
    this.firstYear = new FirstYear(data.FirstYear);
    this.premiumVehicle = new PremiumVehicle(data.PremiumVehicle);
    this.standard = new Standard(data.Standard);
  }
}
