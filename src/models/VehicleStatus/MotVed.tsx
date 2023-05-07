import { VedRate } from "./VedRate";

export class MotVed {
  vedRate: VedRate | null;
  vedCo2Emissions: number | null;
  vedBand: string | null;
  vedCo2Band: string | null;

  constructor(data: any) {
    this.vedRate = data.VedRate ? new VedRate(data.VedRate) : null;
    this.vedCo2Emissions = data.VedCo2Emissions;
    this.vedBand = data.VedBand;
    this.vedCo2Band = data.VedCo2Band;
  }
}
