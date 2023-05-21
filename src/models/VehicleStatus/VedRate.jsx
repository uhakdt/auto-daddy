import { FirstYear } from "./FirstYear";
import { PremiumVehicle } from "./PremiumVehicle";
import { Standard } from "./Standard";

export class VedRate {
  firstYear;
  premiumVehicle;
  standard;

  constructor(data) {
    this.firstYear = data.FirstYear ? new FirstYear(data.FirstYear) : null;
    this.premiumVehicle = data.PremiumVehicle
      ? new PremiumVehicle(data.PremiumVehicle)
      : null;
    this.standard = data.Standard ? new Standard(data.Standard) : null;
  }
}
