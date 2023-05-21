import { VedRate } from "./VedRate";

export class MotVed {
  vedRate;
  vedCo2Emissions;
  vedBand;
  vedCo2Band;

  constructor(data) {
    this.vedRate = data.VedRate ? new VedRate(data.VedRate) : null;
    this.vedCo2Emissions = data.VedCo2Emissions;
    this.vedBand = data.VedBand;
    this.vedCo2Band = data.VedCo2Band;
  }
}
